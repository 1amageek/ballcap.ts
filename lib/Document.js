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
// tslint:disable-next-line:no-namespace
var Modelable;
(function (Modelable) {
    function name() {
        return 1;
    }
})(Modelable = exports.Modelable || (exports.Modelable = {}));
class SSS extends Modelable {
}
class Document {
    constructor(type, id, data, reference) {
        this.createdAt = FirebaseFirestore.Timestamp.now();
        this.updatedAt = FirebaseFirestore.Timestamp.now();
        this._type = type;
        this.data = new type();
        type.toString();
        if (id) {
            this.documentReference = this.collectionReference(type).doc(id);
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
    static collectionReference() {
        return index_1.firestore.collection(this.path());
    }
    static version() {
        return "1";
    }
    static modelName() {
        return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1].toLowerCase();
    }
    static path() {
        return `version/${this.version()}/${this.modelName()}`;
    }
    modelName(type) {
        return type.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1].toLowerCase();
    }
    path(type) {
        return `version/1/${this.modelName(type)}`;
    }
    collectionReference(type) {
        return index_1.firestore.collection(this.path(type));
    }
    init(id, data) {
        this.documentReference = Referenceable.collectionReference().doc(id);
        this.id = id;
        this.data = data;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const batch = this.pack(BatchType.save);
            try {
                const result = yield batch.commit();
                this.batch(BatchType.save);
                this._updateValues = {};
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const batch = this.pack(BatchType.update);
            try {
                const result = yield batch.commit();
                this.batch(BatchType.update);
                this._updateValues = {};
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.reference.delete();
        });
    }
}
exports.Document = Document;
//# sourceMappingURL=Document.js.map