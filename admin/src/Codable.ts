import { DataRepresentable } from './DataRepresentable'
import "reflect-metadata"

export const CodableSymbol = Symbol("Codable")

export const Codable = <T extends DataRepresentable>(type: { new(): T }, codingKey?: string) => {
	return <T extends DataRepresentable>(target: T, fieldKey: string) => {
		const key: string = codingKey || fieldKey
		const condingKeys = Reflect.getMetadata(CodableSymbol, target) || {}
		condingKeys[key] = type
		Reflect.defineMetadata(CodableSymbol, condingKeys, target)
	}
}
