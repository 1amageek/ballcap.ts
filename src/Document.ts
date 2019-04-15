import * as FirebaseFirestore from '@google-cloud/firestore'
import { Referenceable } from './Referenceable'
import { Field, FieldSymbol } from './Field'
import { Batch } from './Batch'
import { firestore } from './index'
import { } from "reflect-metadata"

export { Field }

export interface Modelable {
	
}

export interface Documentable extends Referenceable {
	data?: FirebaseFirestore.DocumentData
}

export class Document implements Documentable {

	public id: string

	public data?: FirebaseFirestore.DocumentData

	public documentReference: FirebaseFirestore.DocumentReference

	public snapshot?: FirebaseFirestore.DocumentSnapshot

	public createdAt: FirebaseFirestore.Timestamp = FirebaseFirestore.Timestamp.now()

	public updatedAt: FirebaseFirestore.Timestamp = FirebaseFirestore.Timestamp.now()

	// 

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
		return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1].toLowerCase()
	}

	public path(): string {
		return `version/${this.version()}/${this.modelName()}`
	}

	public collectionReference(): FirebaseFirestore.CollectionReference {
		return firestore.collection(this.path())
	}

	//

	public allFields(): string[] {
		return Reflect.getMetadata(FieldSymbol, this) || []
	}

	private _defineField<T extends keyof ThisType<this>>(key: string, value?: any) {
		const descriptor: PropertyDescriptor = {
			enumerable: true,
			configurable: true,
			get: () => {
				if (this.data) {
					return this.data[key]
				} else {
					return undefined
				}
			},
			set: (newValue) => {
				if (this.data) {
					this.data[key] = newValue
				} else {
					throw Error(`[Ballcap: Document] This document has not data. key: ${key} value: ${newValue}`)
				}
			}
		}
		Object.defineProperty(this, key, descriptor)
	}

	//

	public constructor(id?: string, data?: { [key: string]: any }, reference?: FirebaseFirestore.DocumentReference) {
		const fields: string[] = Reflect.getMetadata(FieldSymbol, this) || []
		for (const field of fields) {
			this._defineField(field)
		}
		if (id) {
			this.documentReference = this.collectionReference().doc(id)
			this.id = id
		} else {
			this.documentReference = this.collectionReference().doc()
			this.id = this.documentReference.id
		}
		if (data) {
			this.data = data
		}
		if (reference) {
			this.documentReference = reference
			this.id = reference.id
		}
	}

	public async save() {
		const batch = new Batch()
		batch.save(this)
		await batch.commit()
	}

	public async update() {
		const batch = new Batch()
		batch.update(this)
		await batch.commit()
	}

	public async delete() {
		const batch = new Batch()
		batch.delete(this)
		await batch.commit()
	}
}

