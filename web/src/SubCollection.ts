import { DocumentType } from './Documentable'
import "reflect-metadata"

export const SubCollectionSymbol = Symbol("SubCollection")

export const SubCollection = <T extends DocumentType>(target: T, fieldKey: string) => {
	const fields = Reflect.getMetadata(SubCollectionSymbol, target) || []
	fields.push(fieldKey)
	Reflect.defineMetadata(SubCollectionSymbol, fields, target)
}
