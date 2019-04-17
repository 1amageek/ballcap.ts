import { Modelable } from "./Modelable"
import "reflect-metadata"

export const FieldSymbol = Symbol("Field")

export const Field = <T extends Modelable>(target: T, fieldKey: string) => {
    const fields = Reflect.getMetadata(FieldSymbol, target) || []
    fields.push(fieldKey)
    Reflect.defineMetadata(FieldSymbol, fields, target)
}
