"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._writeBatch.commit();
        });
    }
}
exports.Batch = Batch;
//# sourceMappingURL=Batch.js.map