import * as FirebaseFirestore from '@google-cloud/firestore'
import { Referenceable } from './Referenceable'
import { Field } from './Field'
import { Batch } from './Batch'
import { Model } from './Model'
import { firestore } from './index'
import { } from "reflect-metadata"


export { Field }

export interface Documentable extends Referenceable {
	data?: FirebaseFirestore.DocumentData
}

export class Base<T extends Model> implements Documentable {

	public id: string

	public data?: T

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
		return this.constructor.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1].toLowerCase()
	}

	public path(): string {
		return `version/${this.version()}/${this.modelName()}`
	}

	public collectionReference(): FirebaseFirestore.CollectionReference {
		return firestore.collection(this.path())
	}

	//

	public constructor(type?: { new(): T }, reference?: string | FirebaseFirestore.DocumentReference, data?: T) {

		if (reference instanceof FirebaseFirestore.DocumentReference) {
			ref = reference
		} else {
			ref = firestore.doc(`${type.path()}/${reference}`)
		}

		if (id && data && reference) {
			this.documentReference = reference
			this.data = data
			this.id = id
			if (data._data) {
				this.createdAt = data._data["createdAt"] || FirebaseFirestore.Timestamp.now()
				this.updatedAt = data._data["updatedAt"] || FirebaseFirestore.Timestamp.now()
			}
		} else if (id && data) {
			this.data = data
			this.documentReference = this.collectionReference().doc(id)
			this.id = id
			if (data._data) {
				this.createdAt = data._data["createdAt"] || FirebaseFirestore.Timestamp.now()
				this.updatedAt = data._data["updatedAt"] || FirebaseFirestore.Timestamp.now()
			}
		} else if (id) {
			this.documentReference = this.collectionReference().doc(id)
			this.id = id
			if (type) {
				this.data = new type()
			}
		} else {
			this.documentReference = this.collectionReference().doc()
			this.id = this.documentReference.id
			if (type) {
				this.data = new type()
			}
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

	public static async get(type: typeof Model & { new(): Model }, reference: string | FirebaseFirestore.DocumentReference) {
		let ref: FirebaseFirestore.DocumentReference
		if (reference instanceof FirebaseFirestore.DocumentReference) {
			ref = reference
		} else {
			ref = firestore.doc(`${type.path()}/${reference}`)
		}
		try {
			const snapshot: FirebaseFirestore.DocumentSnapshot = await ref.get()
			if (snapshot.exists) {
				const model = type.init()
				const document = new this(type, ref.id, model)
				return document
			} else {
				return undefined
			}
		} catch (error) {
			throw error
		}
	}
}

