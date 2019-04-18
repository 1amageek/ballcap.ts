import * as firebase from 'firebase'
export let firestore: firebase.firestore.Firestore
export const initialize = (appFirestore: any) => {
    firestore = appFirestore
}
