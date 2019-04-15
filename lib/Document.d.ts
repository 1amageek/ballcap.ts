import * as FirebaseFirestore from '@google-cloud/firestore';
import { Referenceable } from './Referenceable';
export declare type Modelable = FirebaseFirestore.DocumentData;
export declare namespace Modelable {
}
export interface Documentable<Model extends Modelable> extends Referenceable {
    data?: Model;
}
export declare class Document<Model extends Modelable> implements Documentable<Model> {
    id: string;
    data?: Model;
    documentReference: FirebaseFirestore.DocumentReference;
    snapshot?: FirebaseFirestore.DocumentSnapshot;
    createdAt: FirebaseFirestore.Timestamp;
    updatedAt: FirebaseFirestore.Timestamp;
    private _type;
    static collectionReference(): FirebaseFirestore.CollectionReference;
    static version(): string;
    static modelName(): string;
    static path(): string;
    private modelName;
    private path;
    private collectionReference;
    constructor(type: {
        new (): Model;
    }, id?: string, data?: {
        [key: string]: any;
    }, reference?: FirebaseFirestore.DocumentReference);
    init(id: string, data: Model): void;
    save(): Promise<any>;
    update(): Promise<any>;
    delete(): Promise<any>;
}
