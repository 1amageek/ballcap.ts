import { App } from './App'
import { DocumentData, ModelType, Modelable, DocumentReference } from './index'
import { CodableSymbol } from './Codable'
import { FieldSymbol } from './Field'
import { File } from './File'
import { isDocumentReference } from './util'

export namespace Model {
	export interface Option {
		convertDocumentReference?: boolean
	}
}

export class Model implements ModelType {

	public static model<T extends Model>(): Modelable<T> {
		const type: Modelable<T> = this
		return type
	}

	public static init<T extends Model>(): T {
		const model = new this() as T
		return model
	}

	public static from<T extends Model>(data: { [feild: string]: any }, option?: Model.Option): T {
		const model = new this() as T
		model._set(data, option)
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

	protected _set(data: { [feild: string]: any }, option?: Model.Option) {
		for (const field of this.fields()) {
			const codingKey = this.codingKeys()[field]
			const value = data[codingKey]
			if (value === undefined) {
				this._data[field] = null
			} else {
				this._data[field] = this._decode(value, field, option)
			}
		}
	}

	public data(option?: Model.Option): DocumentData {
		let data: { [feild: string]: any } = {}
		for (const field of this.fields()) {
			const codingKey = this.codingKeys()[field]
			const descriptor = Object.getOwnPropertyDescriptor(this, field)
			if (descriptor && descriptor.get) {
				const value = descriptor.get()
				data[codingKey] = this._encode(value, field, option)
			} else {
				data[codingKey] = null
			}
		}
		return data
	}

	protected _encode(value: any, key: string, option?: Model.Option): any {
		const convertDocumentReference = option?.convertDocumentReference || false
		if (File.is(value)) {
			return value.data(option)
		} else if (value instanceof Model) {
			return value.data(option)
		} else if (value instanceof Array) {
			let container = []
			for (const i of value) {
				container.push(this._encode(i, key, option))
			}
			return container
		} else if (isDocumentReference(value) && convertDocumentReference) {
			const ref: DocumentReference = (value as DocumentReference)
			const firestore = ref.firestore as any
			const projectId = firestore._projectId || firestore.app.options.projectId
			return {
				projectId: projectId,
				path: ref.path
			}
		} else {
			return value
		}
	}


	protected _decode(value: any, key: string, option?: Model.Option): any {
		const convertDocumentReference = option?.convertDocumentReference || false
		if (File.is(value)) {
			return File.from(value)
		} else if (value instanceof Array) {
			let container = []
			for (const i of value) {
				container.push(this._decode(i, key, option))
			}
			return container
		} else if (isDocumentReference(value) && convertDocumentReference) {
			return App.shared().firestore.doc(value.path)
		} else if (value instanceof Object) {
			const codingKeys = Reflect.getMetadata(CodableSymbol, this) || {}
			const modelType = codingKeys[key]
			if (modelType) {
				const model = new modelType.type()
				model._set(value, option)
				return model
			} else {
				return value
			}
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
