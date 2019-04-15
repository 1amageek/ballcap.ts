import * as FirebaseFirestore from '@google-cloud/firestore'
import { Referenceable } from './Referenceable'
import { Field } from './Field'
import { Batch } from './Batch'
import { Model } from './Model'
import { firestore } from './index'
import { } from "reflect-metadata"


export { Field }

export interface Documentable extends Referenceable {
	data(): FirebaseFirestore.DocumentData
}

export class Document extends Model implements Documentable {

	public id: string

	public documentReference: FirebaseFirestore.DocumentReference

	public snapshot?: FirebaseFirestore.DocumentSnapshot

	public createdAt: FirebaseFirestore.Timestamp = FirebaseFirestore.Timestamp.now()

	public updatedAt: FirebaseFirestore.Timestamp = FirebaseFirestore.Timestamp.now()

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

	/**
	 * constructor
	 */
	public constructor(reference?: string | FirebaseFirestore.DocumentReference, data?: { [field: string]: any }) {
		super(data)
		let ref: FirebaseFirestore.DocumentReference | undefined = undefined
		if (reference instanceof FirebaseFirestore.DocumentReference) {
			ref = reference
		} else if (typeof reference === "string") {
			ref = firestore.doc(`${this.path()}/${reference}`)
		}
		if (ref && data) {
			this.documentReference = ref
			this.id = ref.id
			this.createdAt = data["createdAt"] || FirebaseFirestore.Timestamp.now()
			this.updatedAt = data["updatedAt"] || FirebaseFirestore.Timestamp.now()
		} else if (data) {
			this.documentReference = this.collectionReference().doc()
			this.id = this.documentReference.id
			this.createdAt = data["createdAt"] || FirebaseFirestore.Timestamp.now()
			this.updatedAt = data["updatedAt"] || FirebaseFirestore.Timestamp.now()
		} else {
			this.documentReference = this.collectionReference().doc()
			this.id = this.documentReference.id
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
			ref = firestore.doc(`${this.path()}/${reference}`)
		}
		try {
			const snapshot: FirebaseFirestore.DocumentSnapshot = await ref.get()
			if (snapshot.exists) {
				return new this(snapshot.ref, snapshot.data())
			} else {
				return undefined
			}
		} catch (error) {
			throw error
		}
	}
}

