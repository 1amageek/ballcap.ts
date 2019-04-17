import { Model } from '../src/Model'
import { File } from '../src/File'
import { Field } from '../src/Field'
import { } from "reflect-metadata"
import { Codable } from '../src/Codable'


describe("Model Fields", () => {

	test("string", async () => {
		class Doc extends Model {
			@Field a: string = ""
			@Field b: string = ""
		}
		const data = {
			a: "a",
			b: "bb"
		}
		const doc: Doc = Doc.from(data)
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
		const data = {
			a: "a",
			b: "bb"
		}
		const doc: Doc = Doc.from(data)
		expect(doc.a).toEqual("a")
		expect(doc.b).toEqual(`bb`)
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
		const data = {
			a: "a",
			b: "bb"
		}
		const doc: Doc = Doc.from(data)
		expect(doc.a).toEqual("a")
		expect(doc.b).toEqual(`bb`)
		doc.a = "b"
		doc.b = `cc`
		expect(doc.a).toEqual("b")
		expect(doc.b).toEqual(`cc`)
	}, 100)

	test("number", async () => {
		class Doc extends Model {
			@Field n!: number
			@Field f!: number
			@Field d!: number
			@Field i!: number
		}
		const data = {
			n: 0,
			f: -1,
			d: 10.23,
			i: 123
		}
		const doc: Doc = Doc.from(data)
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
		const data = {
			n: 0,
			f: -1,
			d: 10.23,
			i: 123
		}
		const doc: Doc = Doc.from(data)
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

	test("number!", async () => {
		class Doc extends Model {
			@Field n?: number = 0
			@Field f?: number = -1
			@Field d?: number = 10.23
			@Field i?: number = 123
		}
		const data = {
			n: 0,
			f: -1,
			d: 10.23,
			i: 123
		}
		const doc: Doc = Doc.from(data)
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
		const data = {
			t: true,
			f: false
		}
		const doc: Doc = Doc.from(data)
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
		const data = {
			t: true,
			f: false
		}
		const doc: Doc = Doc.from(data)
		expect(doc.t).toEqual(true)
		expect(doc.f).toEqual(false)
		doc.t = undefined
		doc.f = undefined
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
		const data = {
			t: true,
			f: false
		}
		const doc: Doc = Doc.from(data)
		expect(doc.t).toEqual(true)
		expect(doc.f).toEqual(false)
		doc.t = false
		doc.f = true
		expect(doc.t).toEqual(false)
		expect(doc.f).toEqual(true)
	}, 100)

	test("string[]", async () => {
		class Doc extends Model {
			@Field ss: string[] = ["a", "b", "c"]
		}
		const data = {
			ss: ["aa", "bb", "cc"]
		}
		const doc: Doc = Doc.from(data)
		expect(doc.ss).toEqual(["aa", "bb", "cc"])
	}, 100)

	test("string[]?", async () => {
		class Doc extends Model {
			@Field ss?: string[]
		}
		const data = {
			ss: ["aa", "bb", "cc"]
		}
		const doc: Doc = Doc.from(data)
		expect(doc.ss).toEqual(["aa", "bb", "cc"])
	}, 100)

	test("string[]!", async () => {
		class Doc extends Model {
			@Field ss?: string[] = ["a", "b", "c"]
		}
		const data = {
			ss: ["aa", "bb", "cc"]
		}
		const doc: Doc = Doc.from(data)
		expect(doc.ss).toEqual(["aa", "bb", "cc"])
	}, 100)

	test("number[]", async () => {
		class Doc extends Model {
			@Field ss: number[] = [11, 22, 33]
		}
		const data = {
			ss: [1, 2, 3]
		}
		const doc: Doc = Doc.from(data)
		expect(doc.ss).toEqual([1, 2, 3])
	}, 100)

	test("number[]?", async () => {
		class Doc extends Model {
			@Field ss?: number[]
		}
		const data = {
			ss: [1, 2, 3]
		}
		const doc: Doc = Doc.from(data)
		expect(doc.ss).toEqual([1, 2, 3])
	}, 100)

	test("number[]!", async () => {
		class Doc extends Model {
			@Field ss?: number[] = [11, 22, 33]
		}
		const data = {
			ss: [1, 2, 3]
		}
		const doc: Doc = Doc.from(data)
		expect(doc.ss).toEqual([1, 2, 3])
	}, 100)

	test("caseSensitive", async () => {
		class Doc extends Model {
			@Field caseSensitive: string = ""
			@Field casESensitive: string = ""
			@Field casESensitivE: string = ""
		}
		const data = {
			caseSensitive: "caseSensitive",
			casESensitive: "casESensitive",
			casESensitivE: "casESensitivE"
		}
		const doc: Doc = Doc.from(data)
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
		const data = {
			caseSensitive: "caseSensitive",
			casESensitive: "casESensitive",
			casESensitivE: "casESensitivE"
		}
		const doc: Doc = Doc.from(data)
		expect(doc.caseSensitive).toEqual("caseSensitive")
		expect(doc.casESensitive).toEqual("casESensitive")
		expect(doc.casESensitivE).toEqual("casESensitivE")
		doc.caseSensitive = undefined
		doc.casESensitive = undefined
		doc.casESensitivE = undefined
		expect(doc.caseSensitive).toEqual(null)
		expect(doc.casESensitive).toEqual(null)
		expect(doc.casESensitivE).toEqual(null)
	}, 100)

	test("caseSensitive!", async () => {
		class Doc extends Model {
			@Field caseSensitive?: string = ""
			@Field casESensitive?: string = ""
			@Field casESensitivE?: string = ""
		}
		const data = {
			caseSensitive: "caseSensitive",
			casESensitive: "casESensitive",
			casESensitivE: "casESensitivE"
		}
		const doc: Doc = Doc.from(data)
		expect(doc.caseSensitive).toEqual("caseSensitive")
		expect(doc.casESensitive).toEqual("casESensitive")
		expect(doc.casESensitivE).toEqual("casESensitivE")
	}, 100)

	test("object", async () => {
		class Doc extends Model {
			@Field o: { [key: string]: any } = {}
		}
		const data = {
			o: { "a": "b" }
		}
		const doc: Doc = Doc.from(data)
		expect(doc.o).toEqual({ "a": "b" })
	}, 100)

	test("object?", async () => {
		class Doc extends Model {
			@Field o?: { [key: string]: any }
		}
		const data = {
			o: { "a": "b" }
		}
		const doc: Doc = Doc.from(data)
		expect(doc.o).toEqual({ "a": "b" })
	}, 100)

	test("object!", async () => {
		class Doc extends Model {
			@Field o?: { [key: string]: any } = {}
		}
		const data = {
			o: { "a": "b" }
		}
		const doc: Doc = Doc.from(data)
		expect(doc.o).toEqual({ "a": "b" })
	}, 100)

	test("file", async () => {
		class Doc extends Model {
			@Field f: File = File.from({ name: "", mimeType: "", path: "" , url: null, additionalData: {}})
		}
		const data = {
			f: {
				"name": "name", "mimeType": "mimeType", "path": "path", "url": null, "additionalData": {}
			}
		}
		const doc: Doc = Doc.from(data)
		expect(doc.f).toEqual(File.from({ name: "name", mimeType: "mimeType", path: "path" , url: null, additionalData: {}}))
		expect(doc.data()).toEqual({
			"f": {
				"name": "name", "mimeType": "mimeType", "path": "path", "url": null, "additionalData": {}
			}
		})
	}, 100)

	test("file?", async () => {
		class Doc extends Model {
			@Field f?: File
		}
		const data = {
			f: {
				"name": "name", "mimeType": "mimeType", "path": "path", "url": null, "additionalData": {}
			}
		}
		const doc: Doc = Doc.from(data)
		expect(doc.f).toEqual(File.from({ name: "name", mimeType: "mimeType", path: "path" , url: null, additionalData: {}}))
		expect(doc.data()).toEqual({
			"f": {
				"name": "name", "mimeType": "mimeType", "path": "path", "url": null, "additionalData": {}
			}
		})
		doc.f = undefined
		expect(doc.f).toEqual(null)
		expect(doc.data()).toEqual({
			"f": null
		})
	}, 100)

	test("file!", async () => {
		class Doc extends Model {
			@Field f?: File = File.from({ name: "", mimeType: "", path: "" , url: null, additionalData: {}})
		}
		const data = {
			f: {
				"name": "name", "mimeType": "mimeType", "path": "path", "url": null, "additionalData": {}
			}
		}
		const doc: Doc = Doc.from(data)
		expect(doc.f).toEqual(File.from({ name: "name", mimeType: "mimeType", path: "path" , url: null, additionalData: {}}))
		expect(doc.data()).toEqual({
			"f": {
				"name": "name", "mimeType": "mimeType", "path": "path", "url": null, "additionalData": {}
			}
		})
	}, 100)

	test("file[]", async () => {
		class Doc extends Model {
			@Field f: File[] = [File.from({ name: "", mimeType: "", path: "" , url: null, additionalData: {}})]
		}
		const data = {
			f: [{
				"name": "name", "mimeType": "mimeType", "path": "path", "url": null, "additionalData": {}
			}]
		}
		const doc: Doc = Doc.from(data)
		expect(doc.f).toEqual([File.from({ name: "name", mimeType: "mimeType", path: "path" , url: null, additionalData: {}})])
		expect(doc.data()).toEqual({
			"f": [{
				"name": "name", "mimeType": "mimeType", "path": "path", "url": null, "additionalData": {}
			}]
		})
	}, 100)

	test("file[]?", async () => {
		class Doc extends Model {
			@Field f?: File[]
		}
		const data = {
			f: [{
				"name": "name", "mimeType": "mimeType", "path": "path", "url": null, "additionalData": {}
			}]
		}
		const doc: Doc = Doc.from(data)
		expect(doc.f).toEqual([File.from({ name: "name", mimeType: "mimeType", path: "path" , url: null, additionalData: {}})])
		expect(doc.data()).toEqual({
			"f": [{
				"name": "name", "mimeType": "mimeType", "path": "path", "url": null, "additionalData": {}
			}]
		})
		doc.f = undefined
		expect(doc.f).toEqual(null)
		expect(doc.data()).toEqual({
			"f": null
		})
	}, 100)

	test("file[]!", async () => {
		class Doc extends Model {
			@Field f?: File[] = [File.from({ name: "", mimeType: "", path: "" , url: null, additionalData: {}})]
		}
		const data = {
			f: [{
				"name": "name", "mimeType": "mimeType", "path": "path", "url": null, "additionalData": {}
			}]
		}
		const doc: Doc = Doc.from(data)
		expect(doc.f).toEqual([File.from({ name: "name", mimeType: "mimeType", path: "path" , url: null, additionalData: {}})])
		expect(doc.data()).toEqual({
			"f": [{
				"name": "name", "mimeType": "mimeType", "path": "path", "url": null, "additionalData": {}
			}]
		})
	}, 100)

	test("model", async () => {
		class Sub extends Model {
			@Field s: string = ""
		}
		class Doc extends Model {
			@Codable(Sub)
			@Field model: Sub = new Sub()
		}
		const data = {
			model: {
				s: "s"
			}
		}
		const doc: Doc = Doc.from(data)
		expect(doc.model).toEqual(Sub.from({s: "s"}))
		expect(doc.model.s).toEqual("s")
	}, 100)

	test("model?", async () => {
		class Sub extends Model {
			@Field s?: string
		}
		class Doc extends Model {
			@Codable(Sub)
			@Field model?: Sub
		}
		const data = {
			model: {
				s: "s"
			}
		}
		const doc: Doc = Doc.from(data)
		expect(doc.model).toEqual(Sub.from({s: "s"}))
		expect(doc.model!.s).toEqual("s")
		doc.model = undefined
		expect(doc.model).toEqual(null)
	}, 100)

	test("model!", async () => {
		class Sub extends Model {
			@Field s?: string = "s"
		}
		class Doc extends Model {
			@Codable(Sub)
			@Field model?: Sub = new Sub()
		}
		const data = {
			model: {
				s: "s"
			}
		}
		const doc: Doc = Doc.from(data)
		expect(doc.model).toEqual(Sub.from({s: "s"}))
		expect(doc.model!.s).toEqual("s")
	}, 100)

	test("model[]", async () => {
		class Sub extends Model {
			@Field s: string = ""
		}
		class Doc extends Model {
			@Codable(Sub)
			@Field model: Sub[] = [new Sub()]
		}
		const data = {
			model: [{
				s: "s"
			}]
		}
		const doc: Doc = Doc.from(data)
		expect(doc.model[0]).toEqual(Sub.from({s: "s"}))
		expect(doc.model[0].s).toEqual("s")
	}, 100)

	test("model[]?", async () => {
		class Sub extends Model {
			@Field s?: string
		}
		class Doc extends Model {
			@Codable(Sub)
			@Field model?: Sub[]
		}
		const data = {
			model: [{
				s: "s"
			}]
		}
		const doc: Doc = Doc.from(data)
		expect(doc.model![0]).toEqual(Sub.from({s: "s"}))
		expect(doc.model![0].s).toEqual("s")
		doc.model = undefined
		expect(doc.model).toEqual(null)
	}, 100)

	test("model[]!", async () => {
		class Sub extends Model {
			@Field s?: string = "s"
		}
		class Doc extends Model {
			@Codable(Sub)
			@Field model?: Sub[] = [new Sub()]
		}
		const data = {
			model: [{
				s: "s"
			}]
		}
		const doc: Doc = Doc.from(data)
		expect(doc.model![0]).toEqual(Sub.from({s: "s"}))
		expect(doc.model![0].s).toEqual("s")
	}, 100)
})
