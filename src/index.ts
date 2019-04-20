import * as firebase from 'firebase'
import { Field } from './Field'
import { File } from './File'
import { Model } from './Model'
import { Doc } from './Document'
import { Collection } from './Collection'
import { Batch } from './Batch'

/*
 * Protocl
 */
import { Codable } from './Codable'
import { DataRepresentable } from './DataRepresentable'
import { Referenceable } from './Referenceable'
import { Documentable } from './Documentable'

export { Codable, DataRepresentable, Referenceable, Documentable}
export { Field, File, Model, Doc, Collection, Batch }

export let firestore: firebase.firestore.Firestore
export const initialize = (appFirestore: any) => {
    firestore = appFirestore
}

