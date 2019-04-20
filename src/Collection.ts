import * as firebase from 'firebase'
import { firestore } from './index'
import { Documentable } from './Documentable'
import { Referenceable } from './Referenceable'
import { DataRepresentable } from './DataRepresentable'

export class Collection<T extends Documentable> extends Array<T> {

    public collectionReference: firebase.firestore.CollectionReference

    constructor(collectionReference?: firebase.firestore.CollectionReference) {
        super()
        this.collectionReference = collectionReference || firestore.collection("version")
    }

    public doc(id: string, type: T): Referenceable & DataRepresentable {
        return type.init(id)
    }
}