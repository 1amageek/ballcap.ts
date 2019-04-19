import * as firebase from 'firebase'
import { Field } from './Field'
import { Codable } from './Codable'
import { File } from './File'
import { Model } from './Model'
import { Doc } from './Document'
import { Collection } from './Collection'
import { Batch } from './Batch'

export { Field, Codable, File, Model, Doc, Collection, Batch }
export let firestore: firebase.firestore.Firestore
export const initialize = (appFirestore: any) => {
    firestore = appFirestore
}

