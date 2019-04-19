import * as firebase from 'firebase'
import { firestore } from './index'
import { Documentable, Doc } from './Document'

export class Collection<T extends Documentable> extends Array<T> {

    public collectionReference: firebase.firestore.CollectionReference

    constructor(collectionReference?: firebase.firestore.CollectionReference) {
        super()
        this.collectionReference = collectionReference || firestore.collection("version")
    }

    public doc<T extends typeof Doc>(id: string, type: T) {
        return new type(id) as InstanceType<T>
    }
}