import { Model } from "./Model"
import { Field } from './Field'

export class File extends Model {

    @Field public mimeType!: string

	@Field public name!: string
	
	@Field public path!: string

    @Field public url?: string

    @Field public additionalData: { [key: string]: any } = {}

    public constructor() {
        super()
    }
}
