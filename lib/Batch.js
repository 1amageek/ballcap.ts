"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirebaseFirestore = require("@google-cloud/firestore");
const index_1 = require("./index");
class Batch {
    constructor() {
        this._writeBatch = index_1.firestore.batch();
    }
    save(document, reference) {
        if (document.data) {
            const documentReference = reference || document.documentReference;
            const data = document.data;
            data["createdAt"] = FirebaseFirestore.FieldValue.serverTimestamp();
            data["updatedAt"] = FirebaseFirestore.FieldValue.serverTimestamp();
            this._writeBatch.set(documentReference, data);
        }
    }
    update(document, reference) {
        if (document.data) {
            const documentReference = reference || document.documentReference;
            const data = document.data;
            data["updatedAt"] = FirebaseFirestore.FieldValue.serverTimestamp();
            this._writeBatch.update(documentReference, data);
        }
    }
    delete(document, reference) {
        if (document.data) {
            const documentReference = reference || document.documentReference;
            this._writeBatch.delete(documentReference);
        }
    }
}
exports.Batch = Batch;
//# sourceMappingURL=Batch.js.map