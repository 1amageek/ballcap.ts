import { Model } from '../src/Model'
import { Field } from '../src/Field'
import { } from "reflect-metadata"


describe("Document Fields", () => {

    test("string", async () => {
		class Doc extends Model {
			@Field a: string = "a"
			@Field b: string = `aasdfe`
		}
		const doc: Doc = new Doc()
		expect(doc.a).toEqual("a")
		expect(doc.b).toEqual(`aasdfe`)
	}, 100)

	test("string?", async () => {
		class Doc extends Model {
			@Field a?: string
			@Field b?: string
		}
		const doc: Doc = new Doc()
		expect(doc.a).toEqual(null)
		expect(doc.b).toEqual(null)
	}, 100)

	test("string!", async () => {
		class Doc extends Model {
			@Field a?: string = "a"
			@Field b?: string = `aasdfe`
		}
		const doc: Doc = new Doc()
		expect(doc.a).toEqual("a")
		expect(doc.b).toEqual(`aasdfe`)
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
	}, 100)

	test("boolean", async () => {
		class Doc extends Model {
			@Field t: boolean = true
			@Field f: boolean = false
		}
		const doc: Doc = new Doc()
		expect(doc.t).toEqual(true)
		expect(doc.f).toEqual(false)
	}, 100)

	test("boolean?", async () => {
		class Doc extends Model {
			@Field t?: boolean
			@Field f?: boolean
		}
		const doc: Doc = new Doc()
		expect(doc.t).toEqual(null)
		expect(doc.f).toEqual(null)
	}, 100)

	test("boolean!", async () => {
		class Doc extends Model {
			@Field t?: boolean = true
			@Field f?: boolean = false
		}
		const doc: Doc = new Doc()
		expect(doc.t).toEqual(true)
		expect(doc.f).toEqual(false)
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

})
