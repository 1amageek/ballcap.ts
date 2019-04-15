import * as FirebaseFirestore from '@google-cloud/firestore';
import { Referenceable } from './Referenceable';
import { Field } from './Field';
export { Field };
export interface Documentable extends Referenceable {
    data?: FirebaseFirestore.DocumentData;
}
export declare class Document implements Documentable {
    id: string;
    data?: FirebaseFirestore.DocumentData;
    documentReference: FirebaseFirestore.DocumentReference;
    snapshot?: FirebaseFirestore.DocumentSnapshot;
    createdAt: FirebaseFirestore.Timestamp;
    updatedAt: FirebaseFirestore.Timestamp;
    static version(): string;
    static modelName(): string;
    static path(): string;
    static collectionReference(): FirebaseFirestore.CollectionReference;
    version(): string;
    modelName(): string;
    path(): string;
    collectionReference(): FirebaseFirestore.CollectionReference;
    allFields(): string[];
    private _defineField;
    constructor(id?: string, data?: {
        [key: string]: any;
    }, reference?: FirebaseFirestore.DocumentReference);
    save(): Promise<void>;
    update(): Promise<void>;
    delete(): Promise<void>;
}
