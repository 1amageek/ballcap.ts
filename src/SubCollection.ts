import { Referenceable } from './Referenceable'
import { DataRepresentable } from './DataRepresentable'
import "reflect-metadata"

export const SubCollectionSymbol = Symbol("Field")

export const SubCollection = <T extends DataRepresentable & Referenceable>(target: T, fieldKey: string) => {
    const fields = Reflect.getMetadata(SubCollectionSymbol, target) || []
    fields.push(fieldKey)
    Reflect.defineMetadata(SubCollectionSymbol, fields, target)
}
