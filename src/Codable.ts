import { Modelable } from "./Modelable"
import "reflect-metadata"

export const CodableSymbol = Symbol("Codable")
// export const Codable = <T extends Modelable>(condingKeys: { [field: string]: {new(): T} }) => {
//     return (fn: new () => Modelable) => class extends fn {
//         constructor() {
//             super()
//             Reflect.defineMetadata(CodableSymbol, condingKeys, this)
//         }
//     } as any
// }

export const Codable = <T extends Modelable>(type: {new(): T}, codingKey?: string) => {
    return <T extends Modelable>(target: T, fieldKey: string) => {
        const key: string = codingKey || fieldKey
        const condingKeys = Reflect.getMetadata(CodableSymbol, target) || {}
        condingKeys[key] = type
        Reflect.defineMetadata(CodableSymbol, condingKeys, target)
    }
}