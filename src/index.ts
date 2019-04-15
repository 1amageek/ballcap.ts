import * as FirebaseFirestore from '@google-cloud/firestore'

export let firestore: FirebaseFirestore.Firestore
export const initialize = (appFirestore: FirebaseFirestore.Firestore) => {
    firestore = appFirestore
}
