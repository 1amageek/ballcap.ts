import * as firebase from 'firebase'
import { Field } from './Field'
import { Codable } from './Codable'
import { File } from './File'
import { Model } from './Model'
import { Doc } from './Document'
import { Batch } from './Batch'

export { Field, Codable, File, Model, Doc, Batch }
export let firestore: firebase.firestore.Firestore
export const initialize = (appFirestore: any) => {
    firestore = appFirestore
}

