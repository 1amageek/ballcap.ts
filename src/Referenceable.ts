import * as firebase from 'firebase'

export interface Referenceable {

    /*  
        Document ID
    */
    id: string
    
    /*
        DocumentReference
    */
    documentReference: firebase.firestore.DocumentReference

}