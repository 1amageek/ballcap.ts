import { Modelable } from './Modelable'
import { FieldSymbol } from './Field'

export class Model implements Modelable {

	public static init<T extends typeof Model>(this: T): InstanceType<T> {
        return (new this()) as InstanceType<T>
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

	protected _data!: { [feild: string]: any }

	public data(): FirebaseFirestore.DocumentData {
		let data: { [feild: string]: any } = {}
		for (const field of this.fields()) {
			const descriptor = Object.getOwnPropertyDescriptor(this, field)
			if (descriptor && descriptor.get) {
				const value = descriptor.get()
				data[field] = this._parse(value)
			} else {
				data[field] = null
			}	
		}
		return data
	}

	private _parse(value: any): any {
		if (value instanceof Model) {
			return value.data()
		} else if (value instanceof Array) { 
			let container = []
			for (const i of value) {
				container.push(this._parse(i))
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
					const codingKey = this.codingKeys()[key]
					if (this._data[codingKey] === undefined) {
						return null
					}
					return this._data[codingKey]
				} else {
					return undefined
				}
			},
			set: (newValue) => {
				if (this._data) {
					const codingKey = this.codingKeys()[key]
					this._data[codingKey] = newValue
				} else {
					fail(`[Ballcap: Document] This document has not data. key: ${key} value: ${newValue}`)
				}
			}
		}
		Object.defineProperty(this, key, descriptor)
	}

	public constructor(data?: { [key: string]: any }) {
		for (const field of this.fields()) {
			this._defineField(field)
		}
		this._data = data || {}
	}
}

