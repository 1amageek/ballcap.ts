import { Doc } from '../src/Document'
import { Field } from '../src/Field'
import { } from "reflect-metadata"

export class Moc extends Doc {
	@Field a: string = "a"
}
