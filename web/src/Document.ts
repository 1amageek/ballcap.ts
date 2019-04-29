import { Batch } from './Batch'
import { Model } from './Model'
import { DocumentType, Documentable } from './Documentable'
import { Collection } from './Collection'
import { SubCollectionSymbol } from './SubCollection'
import { firestore, DocumentReference, DocumentSnapshot, Timestamp, CollectionReference, SnapshotOptions, Transaction } from './index'
import { } from "reflect-metadata"

export class Doc extends Model implements DocumentType {

	public id: string

	public documentReference: DocumentReference

	public snapshot?: DocumentSnapshot

	public createdAt: Timestamp = Timestamp.now()

	public updatedAt: Timestamp = Timestamp.now()

	public static self<T extends Doc>(): Documentable<T> {
		const type: Documentable<T> = this
		return type
	}

	public static version(): string {
		return "1"
	}

	public static modelName(): string {
		return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1].toLowerCase()
	}

	public static path(): string {
		return `version/${this.version()}/${this.modelName()}`
	}

	public static collectionReference(): CollectionReference {
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

	public collectionReference(): CollectionReference {
		return firestore.collection(this.path())
	}

	public subCollection(path: string) {
		return this.documentReference.collection(path)
	}

	public static init<T extends Doc>(reference?: string | DocumentReference): T {
		const model = new this(reference) as T
		return model
	}

	public static fromData<T extends Doc>(data: { [feild: string]: any }, reference?: string | DocumentReference): T {
		const model = new this(reference) as T
		model._set(data)
		return model
	}

	public static fromSnapshot<T extends Doc>(snapshot: DocumentSnapshot): T {
		const model = new this(snapshot.ref) as T
		model.snapshot = snapshot
		const option: SnapshotOptions = {
			serverTimestamps: "estimate"
		}
		const data = snapshot.data(option)
		if (data) {
			model._set(data)
		}
		return model
	}

	protected _set(data: { [feild: string]: any }) {
		super._set(data)
		this.createdAt = data["createdAt"] || Timestamp.now()
		this.updatedAt = data["updatedAt"] || Timestamp.now()
	}

	private _subCollections: { [key: string]: any } = {}

	private _defineCollection(key: string, value?: any) {
		const descriptor: PropertyDescriptor = {
			enumerable: true,
			configurable: true,
			get: () => {
				return this._subCollections[key]
			},
			set: (newValue) => {
				if (newValue instanceof Collection) {
					newValue.collectionReference = this.documentReference.collection(key)
					this._subCollections[key] = newValue
				}
			}
		}
		Object.defineProperty(this, key, descriptor)
	}

	/**
	 * constructor
	 */
	public constructor(reference?: string | DocumentReference) {
		super()
		let ref: DocumentReference | undefined = undefined
		if (reference instanceof Object) {
			ref = reference
		} else if (typeof reference === "string") {
			ref = firestore.doc(`${this.path()}/${reference}`)
		}
		if (ref) {
			this.documentReference = ref
			this.id = ref.id
		} else {
			this.documentReference = this.collectionReference().doc()
			this.id = this.documentReference.id
		}
		for (const collectoin of this.subCollections()) {
			this._defineCollection(collectoin)
		}
	}

	public setData(data: { [feild: string]: any }) {
		this._set(data)
		return this
	}

	public async fetch(transaction?: Transaction) {
		try {
			let snapshot: DocumentSnapshot
            if (transaction) {
                snapshot = await transaction.get(this.documentReference)
            } else {
                snapshot = await this.documentReference.get()
            }
			this.snapshot = snapshot
			const option: SnapshotOptions = {
				serverTimestamps: "estimate"
			}
			const data = snapshot.data(option)
			if (data) {
				this._set(data)
			}
			return this
		} catch (error) {
			throw error
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

	public static async get<T extends Doc>(reference: string | DocumentReference) {
		let ref: DocumentReference
		if (reference instanceof DocumentReference) {
			ref = reference
		} else {
			ref = firestore.doc(`${this.path()}/${reference}`)
		}
		try {
			const snapshot: DocumentSnapshot = await ref.get()
			if (snapshot.exists) {
				const model = new this(snapshot.ref) as T
				model.snapshot = snapshot
				const data = snapshot.data()
				if (data) {
					model._set(data)
				}
				return model
			} else {
				return undefined
			}
		} catch (error) {
			throw error
		}
	}

	public subCollections(): string[] {
		return Reflect.getMetadata(SubCollectionSymbol, this) || []
	}
}

