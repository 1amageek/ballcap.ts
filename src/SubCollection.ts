import { Documentable } from "./Document"
import "reflect-metadata"

export const SubCollectionSymbol = Symbol("Field")

export const SubCollection = <T extends Documentable>(target: T, fieldKey: string) => {
    const fields = Reflect.getMetadata(SubCollectionSymbol, target) || []
    fields.push(fieldKey)
    Reflect.defineMetadata(SubCollectionSymbol, fields, target)
}
