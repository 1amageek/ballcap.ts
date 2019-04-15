"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
exports.FieldSymbol = Symbol("Field");
exports.Field = (target, fieldKey) => {
    const fields = Reflect.getMetadata(exports.FieldSymbol, target) || [];
    fields.push(fieldKey);
    Reflect.defineMetadata(exports.FieldSymbol, fields, target);
};
//# sourceMappingURL=Field.js.map