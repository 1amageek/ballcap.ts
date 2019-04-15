import * as FirebaseFirestore from '@google-cloud/firestore'
import { firestore } from './index'
import { Documentable } from './Document'

export class Batch {

	private _writeBatch: FirebaseFirestore.WriteBatch

	public constructor() {
		this._writeBatch = firestore.batch()
	}

	public save<T extends Documentable>(document: T, reference?: FirebaseFirestore.DocumentReference) {
		if (document.data) {
			const documentReference = reference || document.documentReference
			const data = document.data as FirebaseFirestore.DocumentData
			data["createdAt"] = FirebaseFirestore.FieldValue.serverTimestamp()
            data["updatedAt"] = FirebaseFirestore.FieldValue.serverTimestamp()
			this._writeBatch.set(documentReference, data)
		}
	}

	public update<T extends Documentable>(document: T, reference?: FirebaseFirestore.DocumentReference) {
		if (document.data) {
			const documentReference = reference || document.documentReference
			const data = document.data as FirebaseFirestore.DocumentData
            data["updatedAt"] = FirebaseFirestore.FieldValue.serverTimestamp()
			this._writeBatch.update(documentReference, data)
		}
	}

	public delete<T extends Documentable>(document: T, reference?: FirebaseFirestore.DocumentReference) {
		if (document.data) {
			const documentReference = reference || document.documentReference
			this._writeBatch.delete(documentReference)
		}
	}

	public async commit() {
		return await this._writeBatch.commit()
	}
}