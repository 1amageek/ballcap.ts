import * as firebase from 'firebase-admin'

/*
 * Protocol
 */
import { DataRepresentable } from './DataRepresentable'
import { Referenceable } from './Referenceable'
import { ModelType, Modelable } from './Modelable'
import { DocumentType, Documentable } from './Documentable'

export { DataRepresentable, Referenceable, ModelType, Modelable, DocumentType, Documentable }

/*
 * Class
 */
import { App } from './App'
import { Codable } from './Codable'
import { Field } from './Field'
import { File } from './File'
import { SubCollection } from './SubCollection'
import { Model } from './Model'
import { Doc } from './Document'
import { Collection } from './Collection'
import { Batch } from './Batch'

export { Codable, Field, File, SubCollection, Model, Doc, Collection, Batch }

export let firestore: firebase.firestore.Firestore
export const initialize = (app: firebase.app.App | any, _firestore?: firebase.firestore.Firestore) => {
	firestore = _firestore ?? app.firestore()
	App.shared().set(app, firestore)
}

export import CollectionReference = firebase.firestore.CollectionReference
export import DocumentData = firebase.firestore.DocumentData
export import DocumentReference = firebase.firestore.DocumentReference
export import DocumentSnapshot = firebase.firestore.DocumentSnapshot
export import FieldPath = firebase.firestore.FieldPath
export import Firestore = firebase.firestore.Firestore
export import GeoPoint = firebase.firestore.GeoPoint
export import Query = firebase.firestore.Query
export import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
export import QuerySnapshot = firebase.firestore.QuerySnapshot
export import Timestamp = firebase.firestore.Timestamp
export import Transaction = firebase.firestore.Transaction
export import WriteBatch = firebase.firestore.WriteBatch

// FieldValue
export let FieldValue: any = firebase.firestore.FieldValue
export const setFieldValue = (fieldValue: any) => {
	FieldValue = fieldValue
}
