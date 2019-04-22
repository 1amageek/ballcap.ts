import { CodableSymbol } from './Codable'
import { FieldSymbol } from './Field'
import { DataRepresentable } from './DataRepresentable'
import { File } from './File'

export class Model implements DataRepresentable {

	public static from<T extends Model>(data: { [feild: string]: any }): T {
		const model = new this() as T
		model._set(data)
		return model
	}

	public codingKeys(): { [localKey: string]: string } {
		const fields = this.fields()
		const keys: { [key: string]: string } = {}
		for (const field of fields) {
			keys[field] = field
		}
		return keys
	}

	public fields(): string[] {
		return Reflect.getMetadata(FieldSymbol, this) || []
	}

	protected _data: { [feild: string]: any } = {}

	protected _set(data: { [feild: string]: any }) {
		for (const field of this.fields()) {
			const codingKey = this.codingKeys()[field]
			const value = data[codingKey]
			if (value === undefined) {
				this._data[field] = null
			} else {
				this._data[field] = this._decode(value, field)
			}
		}
	}

	private _decode(value: any, key: string): any {
		if (File.is(value)) {
			return File.from(value)
		} else if (value instanceof Array) {
			let container = []
			for (const i of value) {
				container.push(this._decode(i, key))
			}
			return container
		} else if (value instanceof Object) {
			const codingKeys = Reflect.getMetadata(CodableSymbol, this) || {}
			const modelType = codingKeys[key]
			if (modelType) {
				const model = new modelType()
				model._set(value)
				return model
			} else {
				return value
			}
		} else {
			return value
		}
	}

	public data(): firebase.firestore.DocumentData {
		let data: { [feild: string]: any } = {}
		for (const field of this.fields()) {
			const codingKey = this.codingKeys()[field]
			const descriptor = Object.getOwnPropertyDescriptor(this, field)
			if (descriptor && descriptor.get) {
				const value = descriptor.get()
				data[codingKey] = this._encode(value)
			} else {
				data[codingKey] = null
			}
		}
		return data
	}

	private _encode(value: any): any {
		if (value instanceof Model) {
			return value.data()
		} else if (value instanceof Array) {
			let container = []
			for (const i of value) {
				container.push(this._encode(i))
			}
			return container
		} else {
			return value
		}
	}

	private _defineField(key: string, value?: any) {
		const descriptor: PropertyDescriptor = {
			enumerable: true,
			configurable: true,
			get: () => {
				if (this._data) {
					if (this._data[key] === undefined) {
						return null
					}
					return this._data[key]
				} else {
					return undefined
				}
			},
			set: (newValue) => {
				if (this._data) {
					this._data[key] = newValue
				} else {
					fail(`[Ballcap: Document] This document has not data. key: ${key} value: ${newValue}`)
				}
			}
		}
		Object.defineProperty(this, key, descriptor)
	}

	public constructor() {
		for (const field of this.fields()) {
			this._defineField(field)
		}
	}
}
