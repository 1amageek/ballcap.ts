import * as firebase from 'firebase'
import { Model } from '../src/Model'
import { File } from '../src/File'
import { Field } from '../src/Field'
import { } from "reflect-metadata"


describe("Model Fields", () => {

	test("string", async () => {
		class Doc extends Model {
			@Field a: string = "a"
			@Field b: string = `bb`
		}
		const doc: Doc = new Doc()
		expect(doc.a).toEqual("a")
		expect(doc.b).toEqual(`bb`)
		doc.a = "b"
		doc.b = `cc`
		expect(doc.a).toEqual("b")
		expect(doc.b).toEqual(`cc`)
	}, 100)

	test("string?", async () => {
		class Doc extends Model {
			@Field a?: string
			@Field b?: string
		}
		const doc: Doc = new Doc()
		expect(doc.a).toEqual(null)
		expect(doc.b).toEqual(null)
		doc.a = "b"
		doc.b = `cc`
		expect(doc.a).toEqual("b")
		expect(doc.b).toEqual(`cc`)
	}, 100)

	test("string!", async () => {
		class Doc extends Model {
			@Field a?: string = "a"
			@Field b?: string = `aasdfe`
		}
		const doc: Doc = new Doc()
		expect(doc.a).toEqual("a")
		expect(doc.b).toEqual(`aasdfe`)
		doc.a = "b"
		doc.b = `cc`
		expect(doc.a).toEqual("b")
		expect(doc.b).toEqual(`cc`)
	}, 100)

	test("number", async () => {
		class Doc extends Model {
			@Field n: number = 0
			@Field f: number = -1
			@Field d: number = 10.23
			@Field i: number = 123
		}
		const doc: Doc = new Doc()
		expect(doc.n).toEqual(0)
		expect(doc.f).toEqual(-1)
		expect(doc.d).toEqual(10.23)
		expect(doc.i).toEqual(123)
		doc.n = -0
		doc.f = 1
		doc.d = -10.23
		doc.i = -123
		expect(doc.n).toEqual(-0)
		expect(doc.f).toEqual(1)
		expect(doc.d).toEqual(-10.23)
		expect(doc.i).toEqual(-123)
	}, 100)

	test("number?", async () => {
		class Doc extends Model {
			@Field n?: number
			@Field f?: number
			@Field d?: number
			@Field i?: number
		}
		const doc: Doc = new Doc()
		expect(doc.n).toEqual(null)
		expect(doc.f).toEqual(null)
		expect(doc.d).toEqual(null)
		expect(doc.i).toEqual(null)
		doc.n = -0
		doc.f = 1
		doc.d = -10.23
		doc.i = -123
		expect(doc.n).toEqual(-0)
		expect(doc.f).toEqual(1)
		expect(doc.d).toEqual(-10.23)
		expect(doc.i).toEqual(-123)
	}, 100)

	test("number!", async () => {
		class Doc extends Model {
			@Field n?: number = 0
			@Field f?: number = -1
			@Field d?: number = 10.23
			@Field i?: number = 123
		}
		const doc: Doc = new Doc()
		expect(doc.n).toEqual(0)
		expect(doc.f).toEqual(-1)
		expect(doc.d).toEqual(10.23)
		expect(doc.i).toEqual(123)
		doc.n = -0
		doc.f = 1
		doc.d = -10.23
		doc.i = -123
		expect(doc.n).toEqual(-0)
		expect(doc.f).toEqual(1)
		expect(doc.d).toEqual(-10.23)
		expect(doc.i).toEqual(-123)
	}, 100)

	test("boolean", async () => {
		class Doc extends Model {
			@Field t: boolean = true
			@Field f: boolean = false
		}
		const doc: Doc = new Doc()
		expect(doc.t).toEqual(true)
		expect(doc.f).toEqual(false)
		doc.t = false
		doc.f = true
		expect(doc.t).toEqual(false)
		expect(doc.f).toEqual(true)
	}, 100)

	test("boolean?", async () => {
		class Doc extends Model {
			@Field t?: boolean
			@Field f?: boolean
		}
		const doc: Doc = new Doc()
		expect(doc.t).toEqual(null)
		expect(doc.f).toEqual(null)
		doc.t = false
		doc.f = true
		expect(doc.t).toEqual(false)
		expect(doc.f).toEqual(true)
	}, 100)

	test("boolean!", async () => {
		class Doc extends Model {
			@Field t?: boolean = true
			@Field f?: boolean = false
		}
		const doc: Doc = new Doc()
		expect(doc.t).toEqual(true)
		expect(doc.f).toEqual(false)
		doc.t = false
		doc.f = true
		expect(doc.t).toEqual(false)
		expect(doc.f).toEqual(true)
	}, 100)

	test("string[]", async () => {
		class Doc extends Model {
			@Field ss: string[] = ["aa", "bb", "cc"]
		}
		const doc: Doc = new Doc()
		expect(doc.ss).toEqual(["aa", "bb", "cc"])
	}, 100)

	test("string[]?", async () => {
		class Doc extends Model {
			@Field ss?: string[]
		}
		const doc: Doc = new Doc()
		expect(doc.ss).toEqual(null)
	}, 100)

	test("string[]!", async () => {
		class Doc extends Model {
			@Field ss?: string[] = ["aa", "bb", "cc"]
		}
		const doc: Doc = new Doc()
		expect(doc.ss).toEqual(["aa", "bb", "cc"])
	}, 100)

	test("number[]", async () => {
		class Doc extends Model {
			@Field ss: number[] = [1, 2, 3]
		}
		const doc: Doc = new Doc()
		expect(doc.ss).toEqual([1, 2, 3])
	}, 100)

	test("number[]?", async () => {
		class Doc extends Model {
			@Field ss?: number[]
		}
		const doc: Doc = new Doc()
		expect(doc.ss).toEqual(null)
	}, 100)

	test("number[]!", async () => {
		class Doc extends Model {
			@Field ss?: number[] = [1, 2, 3]
		}
		const doc: Doc = new Doc()
		expect(doc.ss).toEqual([1, 2, 3])
	}, 100)

	test("caseSensitive", async () => {
		class Doc extends Model {
			@Field caseSensitive: string = "caseSensitive"
			@Field casESensitive: string = "casESensitive"
			@Field casESensitivE: string = "casESensitivE"
		}
		const doc: Doc = new Doc()
		expect(doc.caseSensitive).toEqual("caseSensitive")
		expect(doc.casESensitive).toEqual("casESensitive")
		expect(doc.casESensitivE).toEqual("casESensitivE")
	}, 100)

	test("caseSensitive?", async () => {
		class Doc extends Model {
			@Field caseSensitive?: string
			@Field casESensitive?: string
			@Field casESensitivE?: string
		}
		const doc: Doc = new Doc()
		expect(doc.caseSensitive).toEqual(null)
		expect(doc.casESensitive).toEqual(null)
		expect(doc.casESensitivE).toEqual(null)
	}, 100)

	test("caseSensitive!", async () => {
		class Doc extends Model {
			@Field caseSensitive?: string = "caseSensitive"
			@Field casESensitive?: string = "casESensitive"
			@Field casESensitivE?: string = "casESensitivE"
		}
		const doc: Doc = new Doc()
		expect(doc.caseSensitive).toEqual("caseSensitive")
		expect(doc.casESensitive).toEqual("casESensitive")
		expect(doc.casESensitivE).toEqual("casESensitivE")
	}, 100)

	test("object", async () => {
		class Doc extends Model {
			@Field o: { [key: string]: any } = { "a": "b" }
		}
		const doc: Doc = new Doc()
		expect(doc.o).toEqual({ "a": "b" })
	}, 100)

	test("object?", async () => {
		class Doc extends Model {
			@Field o?: { [key: string]: any }
		}
		const doc: Doc = new Doc()
		expect(doc.o).toEqual(null)
	}, 100)

	test("object!", async () => {
		class Doc extends Model {
			@Field o?: { [key: string]: any } = { "a": "b" }
		}
		const doc: Doc = new Doc()
		expect(doc.o).toEqual({ "a": "b" })
	}, 100)

	test("file", async () => {
		class Doc extends Model {
			@Field f: File = File.from({ mimeType: "mimeType", path: "path", url: null, metadata: {} })
		}
		const doc: Doc = new Doc()
		expect(doc.f).toEqual(File.from({ mimeType: "mimeType", path: "path", url: null, metadata: {} }))
		expect(doc.data()).toEqual({
			"f": {
				"mimeType": "mimeType", "path": "path", "url": null, "metadata": {}
			}
		})
	}, 100)

	test("file?", async () => {
		class Doc extends Model {
			@Field f?: File
		}
		const doc: Doc = new Doc()
		expect(doc.f).toEqual(null)
		expect(doc.data()).toEqual({
			"f": null
		})
	}, 100)

	test("file!", async () => {
		class Doc extends Model {
			@Field f?: File = File.from({ mimeType: "mimeType", path: "path", url: null, metadata: {} })
		}
		const doc: Doc = new Doc()
		expect(doc.f).toEqual(File.from({ mimeType: "mimeType", path: "path", url: null, metadata: {} }))
		expect(doc.data()).toEqual({
			"f": {
				"mimeType": "mimeType", "path": "path", "url": null, "metadata": {}
			}
		})
	}, 100)

	test("file[]", async () => {
		class Doc extends Model {
			@Field f: File[] = [File.from({ mimeType: "mimeType", path: "path", url: null, metadata: {} })]
		}
		const doc: Doc = new Doc()
		expect(doc.f).toEqual([File.from({ mimeType: "mimeType", path: "path", url: null, metadata: {} })])
		expect(doc.data()).toEqual({
			"f": [{
				"mimeType": "mimeType", "path": "path", "url": null, "metadata": {}
			}]
		})
	}, 100)

	test("file[]?", async () => {
		class Doc extends Model {
			@Field f?: File[]
		}
		const doc: Doc = new Doc()
		expect(doc.f).toEqual(null)
		expect(doc.data()).toEqual({
			"f": null
		})
	}, 100)

	test("file[]!", async () => {
		class Doc extends Model {
			@Field f?: File[] = [File.from({ mimeType: "mimeType", path: "path", url: null, metadata: {} })]
		}
		const doc: Doc = new Doc()
		expect(doc.f).toEqual([File.from({ mimeType: "mimeType", path: "path", url: null, metadata: {} })])
		expect(doc.data()).toEqual({
			"f": [{
				"mimeType": "mimeType", "path": "path", "url": null, "metadata": {}
			}]
		})
	}, 100)

	test("model", async () => {
		class Sub extends Model {
			@Field s: string = "s"
		}
		class Doc extends Model {
			@Field model: Sub = new Sub()
		}
		const doc: Doc = new Doc()
		expect(doc.model).toEqual(new Sub())
		expect(doc.model.s).toEqual("s")
	}, 100)

	test("model?", async () => {
		class Sub extends Model {
			@Field s?: string
		}
		class Doc extends Model {
			@Field model?: Sub
		}
		const doc: Doc = new Doc()
		expect(doc.model).toEqual(null)
	}, 100)

	test("model!", async () => {
		class Sub extends Model {
			@Field s?: string = "s"
		}
		class Doc extends Model {
			@Field model?: Sub = new Sub()
		}
		const doc: Doc = new Doc()
		expect(doc.model).toEqual(new Sub())
		expect(doc.model!.s).toEqual("s")
	}, 100)

	test("FieldValue", async () => {
		class Doc extends Model {
			@Field t: firebase.firestore.Timestamp | firebase.firestore.FieldValue = firebase.firestore.FieldValue.serverTimestamp()
		}

		const doc: Doc = new Doc()
		expect(doc.t).toEqual(firebase.firestore.FieldValue.serverTimestamp())
	}, 100)

	test("FieldValue", async () => {
		class Doc extends Model {
			@Field t?: firebase.firestore.Timestamp | firebase.firestore.FieldValue
		}
		const doc: Doc = new Doc()
		expect(doc.t).toEqual(null)
	}, 100)

	test("FieldValue", async () => {
		class Doc extends Model {
			@Field t?: firebase.firestore.Timestamp | firebase.firestore.FieldValue = firebase.firestore.FieldValue.serverTimestamp()
		}
		const doc: Doc = new Doc()
		expect(doc.t).toEqual(firebase.firestore.FieldValue.serverTimestamp())
	}, 100)
})
