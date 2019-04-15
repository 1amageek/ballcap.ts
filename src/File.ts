import { Model } from "./Model"
import { Field } from './Field'

export class File extends Model {

    @Field public mimeType!: string

	@Field public name!: string
	
	@Field public path!: string

    @Field public url?: string

    @Field public additionalData: { [key: string]: any } = {}

    public constructor(data?: { [key: string]: any }) {
        super(data)
    }

    public static from(name: string, mimeType: string, path: string): File {
        return new File({
            name: name,
            mimeType: mimeType,
            path: path
        })
    }
}
