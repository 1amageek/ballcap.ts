import { DataRepresentable } from './DataRepresentable'

export interface Modelable {
	from(data: { [feild: string]: any }): DataRepresentable
	init(): DataRepresentable
}