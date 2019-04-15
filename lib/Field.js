"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldMetadataKey = Symbol("Field");
exports.property = (target, propertyKey) => {
    const properties = Reflect.getMetadata(FieldMetadataKey, target) || [];
    properties.push(propertyKey);
    Reflect.defineMetadata(FieldMetadataKey, properties, target);
};
//# sourceMappingURL=Field.js.map