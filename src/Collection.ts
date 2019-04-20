import * as firebase from 'firebase'
import { firestore } from './index'
import { Documentable, DocumentType } from './Documentable'

export class Collection<T extends DocumentType> extends Array<T> {

    public collectionReference: firebase.firestore.CollectionReference

    constructor(collectionReference?: firebase.firestore.CollectionReference) {
        super()
        this.collectionReference = collectionReference || firestore.collection("version")
    }

    public doc<U extends Documentable>(id: string, type: U): DocumentType {
        return type.init(id)
    }
}