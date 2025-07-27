import { firestore } from './index'
import { FieldValue, WriteBatch, DocumentReference, CollectionReference } from './index'
import { DocumentType } from './Documentable'

export class Batch {

	private _writeBatch: WriteBatch

	public constructor() {
		this._writeBatch = firestore.batch()
	}

	public save<T extends DocumentType>(document: T, reference?: DocumentReference): void
	public save<T extends DocumentType>(documents: T[], reference: CollectionReference): void

	save<T extends DocumentType>(documentOrDocuments: T | T[], reference?: DocumentReference | CollectionReference) {
		// Check if it's an array-like object (including Collection which extends Array)
		const isArrayLike = (Array.isArray(documentOrDocuments) || 
			documentOrDocuments instanceof Array || 
			(typeof documentOrDocuments === 'object' && 'length' in documentOrDocuments && typeof (documentOrDocuments as any).length === 'number'));
		
		// Check if reference is a CollectionReference by checking its methods
		const isCollectionReference = reference && typeof reference === 'object' && 'doc' in reference && 'add' in reference;
		
		if (isArrayLike && isCollectionReference) {
			for (const document of documentOrDocuments) {
				const data = document.data()
				if (data) {
					const documentReference = (reference as CollectionReference).doc(document.id)
					data["createdAt"] = FieldValue.serverTimestamp()
					data["updatedAt"] = FieldValue.serverTimestamp()
					this._writeBatch.set(documentReference, data)
				}
			}
		} else if (documentOrDocuments instanceof Object && !isArrayLike) {
			if (reference instanceof CollectionReference) {
				throw new Error("[Ballcap: Batch] invalid reference. If you want to save the document, please set DocumentReference.")
			}
			const document = documentOrDocuments as unknown as DocumentType
			const data = document.data()
			if (data) {
				const documentReference = (reference || document.documentReference) as DocumentReference
				data["createdAt"] = FieldValue.serverTimestamp()
				data["updatedAt"] = FieldValue.serverTimestamp()
				this._writeBatch.set(documentReference, data)
			}
		}
	}

	public update<T extends DocumentType>(document: T, reference?: DocumentReference): void
	public update<T extends DocumentType>(documents: T[], reference: CollectionReference): void

	update<T extends DocumentType>(documentOrDocuments: T | T[], reference?: DocumentReference | CollectionReference) {
		// Check if it's an array-like object (including Collection which extends Array)
		const isArrayLike = (Array.isArray(documentOrDocuments) || 
			documentOrDocuments instanceof Array || 
			(typeof documentOrDocuments === 'object' && 'length' in documentOrDocuments && typeof (documentOrDocuments as any).length === 'number'));
		
		// Check if reference is a CollectionReference by checking its methods
		const isCollectionReference = reference && typeof reference === 'object' && 'doc' in reference && 'add' in reference;
		
		if (isArrayLike && isCollectionReference) {
			for (const document of documentOrDocuments) {
				const data = document.data()
				if (data) {
					const documentReference = (reference as CollectionReference).doc(document.id)
					data["updatedAt"] = FieldValue.serverTimestamp()
					this._writeBatch.update(documentReference, data)
				}
			}
		} else if (documentOrDocuments instanceof Object && !isArrayLike) {
			if (reference instanceof CollectionReference) {
				throw new Error("[Ballcap: Batch] invalid reference. If you want to update the document, please set DocumentReference.")
			}
			const document = documentOrDocuments as unknown as DocumentType
			const data = document.data()
			if (data) {
				const documentReference = (reference || document.documentReference) as DocumentReference
				data["updatedAt"] = FieldValue.serverTimestamp()
				this._writeBatch.update(documentReference, data)
			}
		}
	}

	public delete<T extends DocumentType>(document: T, reference?: DocumentReference): void
	public delete<T extends DocumentType>(documents: T[], reference: CollectionReference): void

	delete<T extends DocumentType>(documentOrDocuments: T | T[], reference?: DocumentReference | CollectionReference) {
		// Check if it's an array-like object (including Collection which extends Array)
		const isArrayLike = (Array.isArray(documentOrDocuments) || 
			documentOrDocuments instanceof Array || 
			(typeof documentOrDocuments === 'object' && 'length' in documentOrDocuments && typeof (documentOrDocuments as any).length === 'number'));
		
		
		// Check if reference is a CollectionReference by checking its methods
		const isCollectionReference = reference && typeof reference === 'object' && 'doc' in reference && 'add' in reference;
		
		if (isArrayLike && isCollectionReference) {
			const documents = documentOrDocuments as T[];
			for (const document of documents) {
				const documentReference = reference.doc(document.id)
				this._writeBatch.delete(documentReference)
			}
		} else if (documentOrDocuments instanceof Object && !isArrayLike) {
			if (reference instanceof CollectionReference) {
				throw new Error("[Ballcap: Batch] invalid reference. If you want to delete the document, please set DocumentReference.")
			}
			const document = documentOrDocuments as unknown as DocumentType
			const documentReference = (reference || document.documentReference) as DocumentReference
			this._writeBatch.delete(documentReference)
		}
	}

	public async commit() {
		return await this._writeBatch.commit()
	}
}
