import { Doc, Field } from '@1amageek/ballcap'

export default class Item extends Doc {
	@Field name?: string
}