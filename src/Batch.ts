import * as firebase from 'firebase'
import { firestore } from './index'
import { Documentable } from './Document'
import { Collection } from './Collection'

export class Batch {

	private _writeBatch: firebase.firestore.WriteBatch

	public constructor() {
		this._writeBatch = firestore.batch()
	}

	public save<T extends Documentable>(document: T, reference?: firebase.firestore.DocumentReference): void
	public save<T extends Documentable>(documents: Collection<T>, reference: firebase.firestore.CollectionReference): void

	save<T extends Documentable>(documentOrDocuments: T | Collection<T>, reference?: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference) {
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
			const document: T = documentOrDocuments as T
			const data = document.data()
			if (data) {
				const documentReference = (reference || document.documentReference) as firebase.firestore.DocumentReference
				data["createdAt"] = firebase.firestore.FieldValue.serverTimestamp()
				data["updatedAt"] = firebase.firestore.FieldValue.serverTimestamp()
				this._writeBatch.set(documentReference, data)
			}
		}
	}

	public update<T extends Documentable>(document: T, reference?: firebase.firestore.DocumentReference): void
	public update<T extends Documentable>(documents: Collection<T>, reference: firebase.firestore.CollectionReference): void

	update<T extends Documentable>(documentOrDocuments: T | Collection<T>, reference?: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference) {
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
			const document: T = documentOrDocuments as T
			const data = document.data()
			if (data) {
				const documentReference = (reference || document.documentReference) as firebase.firestore.DocumentReference
				data["updatedAt"] = firebase.firestore.FieldValue.serverTimestamp()
				this._writeBatch.update(documentReference, data)
			}
		}
	}

	public delete<T extends Documentable>(document: T, reference?: firebase.firestore.DocumentReference): void
	public delete<T extends Documentable>(documents: Collection<T>, reference: firebase.firestore.CollectionReference): void

	delete<T extends Documentable>(documentOrDocuments: T | Collection<T>, reference?: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference) {
		if (documentOrDocuments instanceof Array && reference instanceof firebase.firestore.CollectionReference) {
			for (const document of documentOrDocuments) {
				const documentReference = reference.doc(document.id)
				this._writeBatch.delete(documentReference)
			}
		} else if (documentOrDocuments instanceof Object) {
			if (reference instanceof firebase.firestore.CollectionReference) {
				fail("[Ballcap: Batch] invalid reference. If you want to delete the document, please set DocumentReference.")
			}
			const document: T = documentOrDocuments as T
			const documentReference = (reference || document.documentReference) as firebase.firestore.DocumentReference
			this._writeBatch.delete(documentReference)
		}
	}

	public async commit() {
		return await this._writeBatch.commit()
	}
}