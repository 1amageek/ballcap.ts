import * as firebase from 'firebase'
import { firestore } from './index'
import { Documentable, DocumentType } from './Documentable'

export class Collection<T extends DocumentType> extends Array<T> {

    public collectionReference: firebase.firestore.CollectionReference

    constructor(collectionReference?: firebase.firestore.CollectionReference) {
        super()
        this.collectionReference = collectionReference || firestore.collection("version")
    }

    public doc<U extends Documentable<T>>(id: string, type: U): T {
        return type.init(id)
    }
}