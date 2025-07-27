import "reflect-metadata";

export const SubCollectionSymbol = Symbol("SubCollection");

export function SubCollection(target: any, fieldKey: string): void {
  const fields = Reflect.getMetadata(SubCollectionSymbol, target) || [];
  fields.push(fieldKey);
  Reflect.defineMetadata(SubCollectionSymbol, fields, target);
}
