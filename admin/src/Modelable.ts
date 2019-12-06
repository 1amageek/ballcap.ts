import { DataRepresentable } from './DataRepresentable'

export interface ModelType extends DataRepresentable {

}

export interface Modelable<T extends ModelType> {
	from(data: { [feild: string]: any }): T
	init(): T
}
