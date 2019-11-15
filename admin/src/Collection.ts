import { firestore, CollectionReference, DocumentReference, FieldPath } from './index'
import { Documentable, DocumentType } from './Documentable'
import { WhereFilterOp, OrderByDirection, Query, DocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore'

export class Collection<T extends DocumentType> extends Array<T> {

    public collectionReference: CollectionReference

    public id: string

    public path: string

    public parent: DocumentReference | null

    constructor(collectionReference?: CollectionReference) {
        super()
        this.collectionReference = collectionReference || firestore.collection("version")
        this.id = this.collectionReference.id
        this.path = this.collectionReference.path
        this.parent = this.collectionReference.parent
    }

    public doc<U extends Documentable<T>>(id: string, type: U): T {
        const ref: DocumentReference = this.collectionReference.doc(id)
        return type.init(ref)
    }
}

export class CollectionGroup<T extends DocumentType> extends Array<T> {

    public collectionID: string

    public query: Query

    public documentReference?: DocumentReference

    constructor(collectionID: string, documentReference?: DocumentReference) {
        super()
        this.collectionID = collectionID
        this.documentReference = documentReference
        this.query = firestore.collectionGroup(collectionID)
    }

    public where(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: any): Query {
        return this.query.where(fieldPath, opStr, value)
    }

    public orderBy(
        fieldPath: string|FieldPath, directionStr?: OrderByDirection
    ): Query {
        return this.query.orderBy(fieldPath, directionStr)
    }

    public limit(limit: number): Query {
        return this.query.limit(limit)
    }

    public offset(offset: number): Query {
        return this.query.offset(offset)
    }

    public select(...field: (string | FieldPath)[]): Query {
        return this.query.select(...field)
    }

    public startAt(snapshot: DocumentSnapshot): Query
    public startAt(...fieldValues: any[]): Query
    startAt(args: any): Query {
        if(args instanceof DocumentSnapshot) {
            return this.query.startAt(args as DocumentSnapshot)
        } else {
            return this.query.startAt(...args)
        }
    }

    public startAfter(snapshot: DocumentSnapshot): Query
    public startAfter(...fieldValues: any[]): Query
    startAfter(args: any): Query {
        if(args instanceof DocumentSnapshot) {
            return this.query.startAfter(args as DocumentSnapshot)
        } else {
            return this.query.startAfter(...args)
        }
    }

    public endBefore(snapshot: DocumentSnapshot): Query
    public endBefore(...fieldValues: any[]): Query
    endBefore(args: any): Query {
        if(args instanceof DocumentSnapshot) {
            return this.query.endBefore(args as DocumentSnapshot)
        } else {
            return this.query.endBefore(...args)
        }
    }


    public endAt(snapshot: DocumentSnapshot): Query
    public endAt(...fieldValues: any[]): Query
    endAt(args: any): Query {
        if(args instanceof DocumentSnapshot) {
            return this.query.endBefore(args as DocumentSnapshot)
        } else {
            return this.query.endBefore(...args)
        }
    }

    public get(): Promise<QuerySnapshot> {
        return this.query.get()
    }
}