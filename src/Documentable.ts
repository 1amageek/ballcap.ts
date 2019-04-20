import * as firebase from 'firebase'
import { Referenceable } from './Referenceable'
import { DataRepresentable } from './DataRepresentable'

export interface DocumentType extends Referenceable, DataRepresentable { }

export interface Documentable<T extends DocumentType> {

	init(reference?: string | firebase.firestore.DocumentReference): T

	fromData(data: { [feild: string]: any }, reference?: string | firebase.firestore.DocumentReference): T

	fromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): T
}