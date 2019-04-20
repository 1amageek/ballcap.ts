import * as firebase from 'firebase'
import { Referenceable } from './Referenceable'
import { DataRepresentable } from './DataRepresentable'

export interface DocumentType extends Referenceable, DataRepresentable { }

export interface Documentable {

	init(reference?: string | firebase.firestore.DocumentReference): DocumentType

	fromData(data: { [feild: string]: any }, reference?: string | firebase.firestore.DocumentReference): DocumentType

	fromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): DocumentType
}