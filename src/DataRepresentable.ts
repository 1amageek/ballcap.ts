import * as firebase from 'firebase'

export interface DataRepresentable {
	data(): firebase.firestore.DocumentData
}
