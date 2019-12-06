import { firestore, CollectionReference, DocumentReference } from './index'
import { Documentable, DocumentType } from './Documentable'

export class Collection<T extends DocumentType> extends Array<T> {

	public collectionReference: CollectionReference

	public id: string

	public path: string

	public parent: DocumentReference | null

	constructor(collectionReference?: CollectionReference) {
		super()
		this.collectionReference = collectionReference || firestore.collection("version")
		this.id = this.collectionReference.id
		this.path = this.collectionReference.path
		this.parent = this.collectionReference.parent
	}

	public doc<U extends Documentable<T>>(id: string, type: U): T {
		const ref: DocumentReference = this.collectionReference.doc(id)
		return type.init(ref)
	}
}
