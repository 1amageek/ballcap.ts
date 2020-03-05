import { CollectionReference, DocumentReference } from './index'
import { Documentable, DocumentType } from './Documentable'

export class Collection<T extends DocumentType> extends Array<T> {

	public collectionReference!: CollectionReference

	public id!: string

	public path!: string

	public parent: DocumentReference | null = null

	constructor() {
		super()
	}

	setCollectionReference(collectionReference: CollectionReference) {
		this.collectionReference = collectionReference
		this.id = collectionReference.id
		this.path = collectionReference.path
		this.parent = collectionReference.parent
	}

	public doc<U extends Documentable<T>>(id: string, type: U): T {
		const ref: DocumentReference = this.collectionReference.doc(id)
		return type.init(ref)
	}
}
