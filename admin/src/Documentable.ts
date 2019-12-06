import { DocumentReference, DocumentSnapshot, Timestamp } from './index'
import { Referenceable } from './Referenceable'
import { DataRepresentable } from './DataRepresentable'
import { DataManagable } from './DataManagable'

export interface DocumentType extends Referenceable, DataRepresentable, DataManagable {

	snapshot?: DocumentSnapshot

	createdAt: Timestamp

	updatedAt: Timestamp
}

export interface Documentable<T extends DocumentType> {

	init(reference?: string | DocumentReference): T

	fromData(data: { [feild: string]: any }, reference?: string | DocumentReference): T

	fromSnapshot(snapshot: DocumentSnapshot): T
}
