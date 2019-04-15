import { Modelable } from "./Modelable";
import "reflect-metadata";
export declare const FieldSymbol: unique symbol;
export declare const Field: <T extends Modelable>(target: T, fieldKey: string) => void;
