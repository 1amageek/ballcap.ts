import { DataRepresentable } from './DataRepresentable'
import "reflect-metadata"

export const CodableSymbol = Symbol("Codable")

export const Codable = <T extends DataRepresentable>(type: { new(): T }, convert: boolean = false, codingKey?: string, ) => {
	return <T extends DataRepresentable>(target: T, fieldKey: string) => {
		const key: string = codingKey || fieldKey
		const condingKeys = Reflect.getMetadata(CodableSymbol, target) || {}
		condingKeys[key] = { type , convert}
		Reflect.defineMetadata(CodableSymbol, condingKeys, target)
	}
}
