import * as FirebaseFirestore from '@google-cloud/firestore';
import { Documentable, Modelable } from './Document';
export declare class Batch {
    private _writeBatch;
    constructor();
    save<U extends Modelable, T extends Documentable<U>>(document: T, reference?: FirebaseFirestore.DocumentReference): void;
    update<U extends Modelable, T extends Documentable<U>>(document: T, reference?: FirebaseFirestore.DocumentReference): void;
    delete<U extends Modelable, T extends Documentable<U>>(document: T, reference?: FirebaseFirestore.DocumentReference): void;
}
