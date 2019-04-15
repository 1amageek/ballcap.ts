import * as FirebaseFirestore from '@google-cloud/firestore'
import { firestore } from './index'
import { Modelable } from './Modelable'
import { FieldSymbol } from './Field'

export class Model implements Modelable {

	public static version(): string {
		return "1"
	}

	public static modelName(): string {
		return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1].toLowerCase()
	}

	public static path(): string {
		return `version/${this.version()}/${this.modelName()}`
	}

	public static collectionReference(): FirebaseFirestore.CollectionReference {
		return firestore.collection(this.path())
	}

	public version(): string {
		return "1"
	}

	public modelName(): string {
		return this.constructor.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1].toLowerCase()
	}

	public path(): string {
		return `version/${this.version()}/${this.modelName()}`
	}

	public collectionReference(): FirebaseFirestore.CollectionReference {
		return firestore.collection(this.path())
	}

	public static init<T extends typeof Model>(this: T): InstanceType<T> {
        return (new this()) as InstanceType<T>
    }
	//

	public codingKeys(): { [localKey: string]: string } {
		const fields = this.allFields()
		const keys: { [key: string]: string } = {}
		for (const field of fields) {
			keys[field] = field
		}
		return keys
	}

	//

	public allFields(): string[] {
		return Reflect.getMetadata(FieldSymbol, this) || []
	}

	_data!: { [feild: string]: any }
	
	private _defineField<T extends keyof ThisType<this>>(key: string, value?: any) {
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

	//

	public constructor(data?: { [key: string]: any }) {
		const fields: string[] = Reflect.getMetadata(FieldSymbol, this) || []
		for (const field of fields) {
			this._defineField(field)
		}
		this._data = data || {}
	}
}

