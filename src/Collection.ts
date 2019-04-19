import * as firebase from 'firebase'
import { firestore } from './index'
import { Doc } from './Document'

export class Collection<T extends Doc> extends Array<T> {

    public collectionReference: firebase.firestore.CollectionReference

    constructor(collectionReference?: firebase.firestore.CollectionReference) {
        super()
        this.collectionReference = collectionReference || firestore.collection("version")
    }
}