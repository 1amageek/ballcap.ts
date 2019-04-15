import * as FirebaseFirestore from '@google-cloud/firestore'


export interface Referenceable {

    /*  
        Document ID
    */
    id: string
    
    /*
        DocumentReference
    */
    documentReference: FirebaseFirestore.DocumentReference

}