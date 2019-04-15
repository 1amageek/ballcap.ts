"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Field_1 = require("./Field");
class Model {
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
    codingKeys() {
        const fields = this.allFields();
        const keys = {};
        for (const field of fields) {
            keys[field] = field;
        }
        return keys;
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
                if (this._data) {
                    const codingKey = this.codingKeys()[key];
                    return this._data[codingKey];
                }
                else {
                    return undefined;
                }
            },
            set: (newValue) => {
                if (this._data) {
                    const codingKey = this.codingKeys()[key];
                    this._data[codingKey] = newValue;
                }
                else {
                    fail();
                }
            }
        };
        Object.defineProperty(this, key, descriptor);
    }
    //
    constructor(data) {
        const fields = Reflect.getMetadata(Field_1.FieldSymbol, this) || [];
        for (const field of fields) {
            this._defineField(field);
        }
        this._data = data || {};
    }
}
exports.Model = Model;
//# sourceMappingURL=Model.js.map