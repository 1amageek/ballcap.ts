import { DataRepresentable } from './DataRepresentable'
import "reflect-metadata"

export const FieldSymbol = Symbol("Field")

export const Field = <T extends DataRepresentable>(target: T, fieldKey: string) => {
	const parentFields = Reflect.getOwnMetadata(FieldSymbol, Object.getPrototypeOf(target)) || []
	const ownFields = Reflect.getOwnMetadata(FieldSymbol, target) || []
	const fields = Array.from(new Set(parentFields.concat(ownFields)))
	if (!fields.includes(fieldKey)) {
		fields.push(fieldKey)
	}
	Reflect.defineMetadata(FieldSymbol, fields, target)
}
