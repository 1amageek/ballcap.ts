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
const Field_1 = require("./Field");
exports.Field = Field_1.Field;
const Batch_1 = require("./Batch");
const index_1 = require("./index");
class Document {
    //
    constructor(id, data, reference) {
        this.createdAt = FirebaseFirestore.Timestamp.now();
        this.updatedAt = FirebaseFirestore.Timestamp.now();
        const fields = Reflect.getMetadata(Field_1.FieldSymbol, this) || [];
        for (const field of fields) {
            this._defineField(field);
        }
        if (id) {
            this.documentReference = this.collectionReference().doc(id);
            this.id = id;
        }
        else {
            this.documentReference = this.collectionReference().doc();
            this.id = this.documentReference.id;
        }
        if (data) {
            this.data = data;
        }
        if (reference) {
            this.documentReference = reference;
            this.id = reference.id;
        }
    }
    // 
    static version() {
        return "1";
    }
    static modelName() {
        return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1].toLowerCase();
    }
    static path() {
        return `version/${this.version()}/${this.modelName()}`;
    }
    static collectionReference() {
        return index_1.firestore.collection(this.path());
    }
    version() {
        return "1";
    }
    modelName() {
        return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1].toLowerCase();
    }
    path() {
        return `version/${this.version()}/${this.modelName()}`;
    }
    collectionReference() {
        return index_1.firestore.collection(this.path());
    }
    //
    allFields() {
        return Reflect.getMetadata(Field_1.FieldSymbol, this) || [];
    }
    _defineField(key, value) {
        const descriptor = {
            enumerable: true,
            configurable: true,
            get: () => {
                if (this.data) {
                    return this.data[key];
                }
                else {
                    return undefined;
                }
            },
            set: (newValue) => {
                if (this.data) {
                    this.data[key] = newValue;
                }
                else {
                    fail();
                    // throw Error(`[Ballcap: Document] This document has not data. key: ${key} value: ${newValue}`)
                }
            }
        };
        Object.defineProperty(this, key, descriptor);
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const batch = new Batch_1.Batch();
            batch.save(this);
            yield batch.commit();
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const batch = new Batch_1.Batch();
            batch.update(this);
            yield batch.commit();
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const batch = new Batch_1.Batch();
            batch.delete(this);
            yield batch.commit();
        });
    }
}
exports.Document = Document;
//# sourceMappingURL=Document.js.map