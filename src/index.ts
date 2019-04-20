import * as firebase from 'firebase'

/*
 * Protocol
 */
import { Codable } from './Codable'
import { DataRepresentable } from './DataRepresentable'
import { Referenceable } from './Referenceable'
import { DocumentType, Documentable } from './Documentable'

export { Codable, DataRepresentable, Referenceable, DocumentType, Documentable }

/*
 * Class
 */
import { Field } from './Field'
import { File } from './File'
import { Model } from './Model'
import { Doc } from './Document'
import { Collection } from './Collection'
import { Batch } from './Batch'

export { Field, File, Model, Doc, Collection, Batch }

export let firestore: firebase.firestore.Firestore
export const initialize = (appFirestore: any) => {
    firestore = appFirestore
}

