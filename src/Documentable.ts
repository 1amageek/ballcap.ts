import * as firebase from 'firebase'
import { Referenceable } from './Referenceable'
import { DataRepresentable } from './DataRepresentable'

export interface Documentable {

	init(reference?: string | firebase.firestore.DocumentReference): Referenceable & DataRepresentable

	fromData(data: { [feild: string]: any }, reference?: string | firebase.firestore.DocumentReference): Referenceable & DataRepresentable

	fromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Referenceable & DataRepresentable
}