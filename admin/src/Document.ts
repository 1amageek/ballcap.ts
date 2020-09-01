import { App } from './App'
import { Batch } from './Batch'
import { Model } from './Model'
import { DocumentType, Documentable } from './Documentable'
import { CodableSymbol } from './Codable'
import { Collection } from './Collection'
import { SubCollectionSymbol } from './SubCollection'
import { firestore, DocumentReference, DocumentData, DocumentSnapshot, Timestamp, CollectionReference, Transaction } from './index'
import "reflect-metadata"

export namespace Doc {
	export interface Option extends Model.Option {
		convertDocument?: boolean
	}
}

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

	public static modelName(): string {
		return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1].toLowerCase()
	}

	public static path(): string {
		return this.collectionReference().path
	}

	public static collectionReference() {
		return firestore.collection(this.modelName())
	}

	public static documentReference(id: string | undefined) {
		if (id) {
			return this.collectionReference().doc(id)
		} else {
			return this.collectionReference().doc()
		}
	}

	public modelName(): string {
		return (this.constructor as any).modelName()
	}

	public path: string

	public parent: CollectionReference

	public subCollection(path: string): CollectionReference {
		return this.documentReference.collection(path)
	}

	public static init<T extends Doc | Model>(reference?: string | DocumentReference): T {
		const model = new this(reference) as T
		return model
	}

	public static fromData<T extends Doc>(data: { [feild: string]: any }, reference?: string | DocumentReference, option?: Doc.Option): T {
		const model = new this(reference) as T
		model._set(data, option)
		return model
	}

	public static fromSnapshot<T extends Doc>(snapshot: DocumentSnapshot, option?: Doc.Option): T {
		const model = new this(snapshot.ref) as T
		model.snapshot = snapshot
		const data = snapshot.data()
		if (data) {
			model._set(data, option)
		}
		return model
	}

	protected _set(data: { [feild: string]: any }, option?: Doc.Option) {
		super._set(data, option)
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
					newValue.setCollectionReference(this.documentReference.collection(key))
					this._subCollections[key] = newValue
				}
			}
		}
		Object.defineProperty(this, key, descriptor)
	}

	public static is(arg: { [key: string]: any }): boolean {
		if (arg instanceof Object) {
			return Object.keys(arg).length === 3 &&
				arg.hasOwnProperty('id') &&
				arg.hasOwnProperty('path') &&
				arg.hasOwnProperty('data')
		} else {
			return false
		}
	}

	public data(option?: Doc.Option): DocumentData {
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

	protected _encode(value: any, key: string, option?: Doc.Option): any {
		if (value instanceof Doc) {
			const codingKeys = Reflect.getMetadata(CodableSymbol, this) || {}
			const modelType = codingKeys[key]
			if (modelType) {
				const convertDocument = option?.convertDocument || modelType.convert || false
				if (convertDocument) {
					return value.convert(option)
				}
			}
		}

		return super._encode(value, key, option)
	}

	protected _decode(value: any, key: string, option?: Doc.Option): any {
		if (Doc.is(value)) {
			const codingKeys = Reflect.getMetadata(CodableSymbol, this) || {}
			const modelType = codingKeys[key]
			if (modelType) {
				const ref = App.shared().firestore.doc(value.path)
				const model = new modelType.type(ref)
				const convertDocument = option?.convertDocument || modelType.convert || false
				model._set(value.data, { ...option, convertDocument })
				return model
			} else {
				return value
			}
		} else {
			return super._decode(value, key, option)
		}
	}

	public convert(option?: Doc.Option) {
		return {
			id: this.id,
			path: this.path,
			data: this.data(option)
		}
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
			ref = (this.constructor as any).collectionReference().doc(`${reference}`)
		}
		if (ref) {
			this.documentReference = ref
			this.parent = this.documentReference.parent
			this.path = ref.path
			this.id = ref.id
		} else {
			this.documentReference = (this.constructor as any).collectionReference().doc()
			this.parent = this.documentReference.parent
			this.path = this.documentReference.path
			this.id = this.documentReference.id
		}
		for (const collection of this.subCollections()) {
			this._defineCollection(collection)
		}
	}

	public setData(data: { [feild: string]: any }, option: Doc.Option = { convertDocumentReference: false, convertDocument: false }) {
		this._set(data, option)
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
			const data = snapshot.data()
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
			ref = this.collectionReference().doc(`${reference}`)
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
