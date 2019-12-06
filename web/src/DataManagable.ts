import { Transaction } from './index'

export interface DataManagable {

	fetch(transaction?: Transaction): Promise<this>

	save(): Promise<void>

	update(): Promise<void>

	delete(): Promise<void>
}
