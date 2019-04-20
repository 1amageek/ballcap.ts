import * as firebase from 'firebase'

export interface DataManagable {

	fetch(transaction?: firebase.firestore.Transaction): Promise<this>

 	save(): Promise<void>

	update(): Promise<void>

	delete(): Promise<void>
}
