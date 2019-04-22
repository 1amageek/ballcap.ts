import { firestore, CollectionReference } from './index'
import { Documentable, DocumentType } from './Documentable'

export class Collection<T extends DocumentType> extends Array<T> {

    public collectionReference: CollectionReference

    constructor(collectionReference?: CollectionReference) {
        super()
        this.collectionReference = collectionReference || firestore.collection("version")
    }

    public doc<U extends Documentable<T>>(id: string, type: U): T {
        return type.init(id)
    }
}