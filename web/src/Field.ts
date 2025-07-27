import "reflect-metadata";

export const FieldSymbol = Symbol("Field");

export function Field(target: any, propertyKey: string): void {
  const parentFields = Reflect.getOwnMetadata(FieldSymbol, Object.getPrototypeOf(target)) || [];
  const ownFields = Reflect.getOwnMetadata(FieldSymbol, target) || [];
  const fields = Array.from(new Set(parentFields.concat(ownFields)));
  
  if (!fields.includes(propertyKey)) {
    fields.push(propertyKey);
  }
  
  Reflect.defineMetadata(FieldSymbol, fields, target);
}
