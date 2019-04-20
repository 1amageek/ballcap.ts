import * as firebase from 'firebase'
import { firestore } from './index'
import { Referenceable } from './Referenceable'
import { DataRepresentable } from './DataRepresentable'

export class Batch {

	private _writeBatch: firebase.firestore.WriteBatch

	public constructor() {
		this._writeBatch = firestore.batch()
	}

	public save<T extends DataRepresentable & Referenceable>(document: T, reference?: firebase.firestore.DocumentReference): void
	public save<T extends DataRepresentable & Referenceable>(documents: T[], reference: firebase.firestore.CollectionReference): void

	save<T extends DataRepresentable & Referenceable>(documentOrDocuments: T | T[], reference?: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference) {
		if (documentOrDocuments instanceof Array && reference instanceof firebase.firestore.CollectionReference) {
			for (const document of documentOrDocuments) {
				const data = document.data()
				if (data) {
					const documentReference = reference.doc(document.id)
					data["createdAt"] = firebase.firestore.FieldValue.serverTimestamp()
					data["updatedAt"] = firebase.firestore.FieldValue.serverTimestamp()
					this._writeBatch.set(documentReference, data)
				}
			}
		} else if (documentOrDocuments instanceof Object) {
			if (reference instanceof firebase.firestore.CollectionReference) {
				fail("[Ballcap: Batch] invalid reference. If you want to save the document, please set DocumentReference.")
			}
			const document = documentOrDocuments as unknown as DataRepresentable & Referenceable
			const data = document.data()
			if (data) {
				const documentReference = (reference || document.documentReference) as firebase.firestore.DocumentReference
				data["createdAt"] = firebase.firestore.FieldValue.serverTimestamp()
				data["updatedAt"] = firebase.firestore.FieldValue.serverTimestamp()
				this._writeBatch.set(documentReference, data)
			}
		}
	}

	public update<T extends DataRepresentable & Referenceable>(document: T, reference?: firebase.firestore.DocumentReference): void
	public update<T extends DataRepresentable & Referenceable>(documents: T[], reference: firebase.firestore.CollectionReference): void

	update<T extends DataRepresentable & Referenceable>(documentOrDocuments: T | T[], reference?: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference) {
		if (documentOrDocuments instanceof Array && reference instanceof firebase.firestore.CollectionReference) {
			for (const document of documentOrDocuments) {
				const data = document.data()
				if (data) {
					const documentReference = reference.doc(document.id)
					data["updatedAt"] = firebase.firestore.FieldValue.serverTimestamp()
					this._writeBatch.update(documentReference, data)
				}
			}
		} else if (documentOrDocuments instanceof Object) {
			if (reference instanceof firebase.firestore.CollectionReference) {
				fail("[Ballcap: Batch] invalid reference. If you want to update the document, please set DocumentReference.")
			}
			const document = documentOrDocuments as unknown as DataRepresentable & Referenceable
			const data = document.data()
			if (data) {
				const documentReference = (reference || document.documentReference) as firebase.firestore.DocumentReference
				data["updatedAt"] = firebase.firestore.FieldValue.serverTimestamp()
				this._writeBatch.update(documentReference, data)
			}
		}
	}

	public delete<T extends DataRepresentable & Referenceable>(document: T, reference?: firebase.firestore.DocumentReference): void
	public delete<T extends DataRepresentable & Referenceable>(documents: T[], reference: firebase.firestore.CollectionReference): void

	delete<T extends DataRepresentable & Referenceable>(documentOrDocuments: T | T[], reference?: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference) {
		if (documentOrDocuments instanceof Array && reference instanceof firebase.firestore.CollectionReference) {
			for (const document of documentOrDocuments) {
				const documentReference = reference.doc(document.id)
				this._writeBatch.delete(documentReference)
			}
		} else if (documentOrDocuments instanceof Object) {
			if (reference instanceof firebase.firestore.CollectionReference) {
				fail("[Ballcap: Batch] invalid reference. If you want to delete the document, please set DocumentReference.")
			}
			const document = documentOrDocuments as unknown as DataRepresentable & Referenceable
			const documentReference = (reference || document.documentReference) as firebase.firestore.DocumentReference
			this._writeBatch.delete(documentReference)
		}
	}

	public async commit() {
		return await this._writeBatch.commit()
	}
}