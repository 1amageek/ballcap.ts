import { DataRepresentable } from './DataRepresentable'

export interface Modelable<T extends DataRepresentable> {
	from(data: { [feild: string]: any }): T
	init(): T
}