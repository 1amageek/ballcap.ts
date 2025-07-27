import "reflect-metadata";
import { DataRepresentable } from "./DataRepresentable";

export const CodableSymbol = Symbol("Codable");

export function Codable<T extends DataRepresentable>(
  type: { new (): T },
  convert: boolean = false,
  codingKey?: string
) {
  return function (target: any, fieldKey: string) {
    const key = codingKey || fieldKey;
    const current = Reflect.getMetadata(CodableSymbol, target) || {};
    current[key] = { type, convert };
    Reflect.defineMetadata(CodableSymbol, current, target);
  };
}
