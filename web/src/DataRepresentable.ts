import { DocumentData, Model } from './index'

export interface DataRepresentable {
	data(option?: Model.Option): DocumentData
}
