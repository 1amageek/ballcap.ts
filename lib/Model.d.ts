import * as FirebaseFirestore from '@google-cloud/firestore';
import { Modelable } from './Modelable';
export declare class Model implements Modelable {
    static version(): string;
    static modelName(): string;
    static path(): string;
    static collectionReference(): FirebaseFirestore.CollectionReference;
    version(): string;
    modelName(): string;
    path(): string;
    collectionReference(): FirebaseFirestore.CollectionReference;
    codingKeys(): {
        [localKey: string]: string;
    };
    allFields(): string[];
    private _data;
    private _defineField;
    constructor(data?: {
        [key: string]: any;
    });
}
