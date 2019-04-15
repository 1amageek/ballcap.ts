
export const FieldSymbol = Symbol("Field")

export const Field = <T extends Document>(target: T, fieldKey: string) => {
    const fields = Reflect.getMetadata(FieldSymbol, target) || []
    fields.push(fieldKey)
    Reflect.defineMetadata(FieldSymbol, fields, target)
}
