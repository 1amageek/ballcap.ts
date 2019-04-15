import * as FirebaseFirestore from '@google-cloud/firestore';
import { Documentable } from './Document';
export declare class Batch {
    private _writeBatch;
    constructor();
    save<T extends Documentable>(document: T, reference?: FirebaseFirestore.DocumentReference): void;
    update<T extends Documentable>(document: T, reference?: FirebaseFirestore.DocumentReference): void;
    delete<T extends Documentable>(document: T, reference?: FirebaseFirestore.DocumentReference): void;
    commit(): Promise<FirebaseFirestore.WriteResult[]>;
}
