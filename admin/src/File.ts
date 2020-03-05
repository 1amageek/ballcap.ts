import { DocumentData } from './index'

export type FileType = {
	mimeType: string
	path: string
	url: string | null
	metadata: { [key: string]: any } | null
}

export class File {

	public static is(arg: { [key: string]: any }): boolean {
		if (arg instanceof Object) {
			return Object.keys(arg).length === 4 &&
				arg.hasOwnProperty('mimeType') &&
				arg.hasOwnProperty('path') &&
				arg.hasOwnProperty('url') &&
				arg.hasOwnProperty('metadata')
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

	public path: string = ""

	public url: string | null = null

	public metadata: { [key: string]: any } | null = null

	public constructor() { }

	private _set(data: FileType) {
		this.mimeType = data.mimeType
		this.path = data.path
		this.url = data.url
		this.metadata = data.metadata
	}

	public data(): DocumentData {
		return {
			mimeType: this.mimeType,
			path: this.path,
			url: this.url,
			metadata: this.metadata
		}
	}
}
