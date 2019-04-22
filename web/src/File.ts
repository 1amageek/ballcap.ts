import { DocumentData } from './index'

export type FileType = {
    mimeType: string
    name: string
    path: string
    url: string | null
    additionalData: { [key: string]: any }
}

export class File {

    public static is(arg: { [key: string]: any }): boolean {
        if (arg instanceof Object) {
            return Object.keys(arg).length === 4 &&
                arg.hasOwnProperty('mimeType') &&
                arg.hasOwnProperty('name') &&
                arg.hasOwnProperty('path') &&
                arg.hasOwnProperty('url') &&
                arg.hasOwnProperty('additionalData')
        } else {
            return false
        }
    }

    public static from(data: FileType): File {
        const file: File = new File()
        file._set(data)
        return file
    }

    public mimeType: string = ""

    public name: string = ""

    public path: string = ""

    public url: string | null = null

    public additionalData: { [key: string]: any } = {}

    public constructor() { }

    private _set(data: FileType) {
        this.mimeType = data.mimeType
        this.name = data.name
        this.path = data.path
        this.url = data.url
        this.additionalData = data.additionalData
    }

    public data(): DocumentData {
		return {
            mimeType: this.mimeType,
            name: this.name,
            path: this.path,
            url: this.url,
            additionalData: this.additionalData
        }
	}
}
