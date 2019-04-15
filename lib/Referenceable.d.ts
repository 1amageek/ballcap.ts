import * as FirebaseFirestore from '@google-cloud/firestore';
export interface Referenceable {
    id: string;
    documentReference: FirebaseFirestore.DocumentReference;
}
