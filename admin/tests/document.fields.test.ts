import * as firebase from '@firebase/testing'
import * as Ballcap from '../src/index'
import { Doc } from '../src/Document'
import { Field } from '../src/Field'
import { } from "reflect-metadata"

const app = firebase.initializeAdminApp({
	projectId: "test-project"
})

Ballcap.initialize(app)

describe("Doc Fields", () => {

	test("string", async () => {
		class Moc extends Doc {
			@Field a: string = "a"
			@Field b: string = `bb`
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({
			"a": "a",
			"b": "bb"
		})
		doc.a = "b"
		doc.b = "cc"
		expect(doc.data()).toEqual({
			"a": "b",
			"b": "cc"
		})
	}, 100)

	test("string?", async () => {
		class Moc extends Doc {
			@Field a?: string
			@Field b?: string
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({
			"a": null,
			"b": null
		})
		doc.a = "b"
		doc.b = `cc`
		expect(doc.data()).toEqual({
			"a": "b",
			"b": "cc"
		})
	}, 100)

	test("string!", async () => {
		class Moc extends Doc {
			@Field a?: string = "a"
			@Field b?: string = `aasdfe`
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({
			"a": "a",
			"b": "aasdfe"
		})
		doc.a = "b"
		doc.b = `cc`
		expect(doc.data()).toEqual({
			"a": "b",
			"b": "cc"
		})
	}, 100)

	test("number", async () => {
		class Moc extends Doc {
			@Field n: number = 0
			@Field f: number = -1
			@Field d: number = 10.23
			@Field i: number = 123
		}
		const doc: Moc = new Moc()
		expect(doc.n).toEqual(0)
		expect(doc.f).toEqual(-1)
		expect(doc.d).toEqual(10.23)
		expect(doc.i).toEqual(123)
		expect(doc.data()).toEqual({
			"n": 0,
			"f": -1,
			"d": 10.23,
			"i": 123
		})
		doc.n = -0
		doc.f = 1
		doc.d = -10.23
		doc.i = -123
		expect(doc.n).toEqual(-0)
		expect(doc.f).toEqual(1)
		expect(doc.d).toEqual(-10.23)
		expect(doc.i).toEqual(-123)
		expect(doc.data()).toEqual({
			"n": -0,
			"f": 1,
			"d": -10.23,
			"i": -123
		})
	}, 100)

	test("number?", async () => {
		class Moc extends Doc {
			@Field n?: number
			@Field f?: number
			@Field d?: number
			@Field i?: number
		}
		const doc: Moc = new Moc()
		expect(doc.n).toEqual(null)
		expect(doc.f).toEqual(null)
		expect(doc.d).toEqual(null)
		expect(doc.i).toEqual(null)
		expect(doc.data()).toEqual({
			"n": null,
			"f": null,
			"d": null,
			"i": null
		})
		doc.n = -0
		doc.f = 1
		doc.d = -10.23
		doc.i = -123
		expect(doc.n).toEqual(-0)
		expect(doc.f).toEqual(1)
		expect(doc.d).toEqual(-10.23)
		expect(doc.i).toEqual(-123)
		expect(doc.data()).toEqual({
			"n": -0,
			"f": 1,
			"d": -10.23,
			"i": -123
		})
	}, 100)

	test("number!", async () => {
		class Moc extends Doc {
			@Field n?: number = 0
			@Field f?: number = -1
			@Field d?: number = 10.23
			@Field i?: number = 123
		}
		const doc: Moc = new Moc()
		expect(doc.n).toEqual(0)
		expect(doc.f).toEqual(-1)
		expect(doc.d).toEqual(10.23)
		expect(doc.i).toEqual(123)
		expect(doc.data()).toEqual({
			"n": 0,
			"f": -1,
			"d": 10.23,
			"i": 123
		})
		doc.n = -0
		doc.f = 1
		doc.d = -10.23
		doc.i = -123
		expect(doc.n).toEqual(-0)
		expect(doc.f).toEqual(1)
		expect(doc.d).toEqual(-10.23)
		expect(doc.i).toEqual(-123)
		expect(doc.data()).toEqual({
			"n": -0,
			"f": 1,
			"d": -10.23,
			"i": -123
		})
	}, 100)

	test("boolean", async () => {
		class Moc extends Doc {
			@Field t: boolean = true
			@Field f: boolean = false
		}
		const doc: Moc = new Moc()
		expect(doc.t).toEqual(true)
		expect(doc.f).toEqual(false)
		expect(doc.data()).toEqual({
			"t": true,
			"f": false
		})
		doc.t = false
		doc.f = true
		expect(doc.t).toEqual(false)
		expect(doc.f).toEqual(true)
		expect(doc.data()).toEqual({
			"t": false,
			"f": true
		})
	}, 100)

	test("boolean?", async () => {
		class Moc extends Doc {
			@Field t?: boolean
			@Field f?: boolean
		}
		const doc: Moc = new Moc()
		expect(doc.t).toEqual(null)
		expect(doc.f).toEqual(null)
		expect(doc.data()).toEqual({
			"t": null,
			"f": null
		})
		doc.t = false
		doc.f = true
		expect(doc.t).toEqual(false)
		expect(doc.f).toEqual(true)
		expect(doc.data()).toEqual({
			"t": false,
			"f": true
		})
	}, 100)

	test("boolean!", async () => {
		class Moc extends Doc {
			@Field t?: boolean = true
			@Field f?: boolean = false
		}
		const doc: Moc = new Moc()
		expect(doc.t).toEqual(true)
		expect(doc.f).toEqual(false)
		expect(doc.data()).toEqual({
			"t": true,
			"f": false
		})
		doc.t = false
		doc.f = true
		expect(doc.t).toEqual(false)
		expect(doc.f).toEqual(true)
		expect(doc.data()).toEqual({
			"t": false,
			"f": true
		})
	}, 100)

	test("string[]", async () => {
		class Moc extends Doc {
			@Field ss: string[] = ["aa", "bb", "cc"]
		}
		const doc: Moc = new Moc()
		expect(doc.ss).toEqual(["aa", "bb", "cc"])
		expect(doc.data()).toEqual({
			"ss": ["aa", "bb", "cc"]
		})
	}, 100)

	test("string[]?", async () => {
		class Moc extends Doc {
			@Field ss?: string[]
		}
		const doc: Moc = new Moc()
		expect(doc.ss).toEqual(null)
		expect(doc.data()).toEqual({
			"ss": null
		})
	}, 100)

	test("string[]!", async () => {
		class Moc extends Doc {
			@Field ss?: string[] = ["aa", "bb", "cc"]
		}
		const doc: Moc = new Moc()
		expect(doc.ss).toEqual(["aa", "bb", "cc"])
		expect(doc.data()).toEqual({
			"ss": ["aa", "bb", "cc"]
		})
	}, 100)

	test("number[]", async () => {
		class Moc extends Doc {
			@Field ss: number[] = [1, 2, 3]
		}
		const doc: Moc = new Moc()
		expect(doc.ss).toEqual([1, 2, 3])
		expect(doc.data()).toEqual({
			"ss": [1, 2, 3]
		})
	}, 100)

	test("number[]?", async () => {
		class Moc extends Doc {
			@Field ss?: number[]
		}
		const doc: Moc = new Moc()
		expect(doc.ss).toEqual(null)
		expect(doc.data()).toEqual({
			"ss": null
		})
	}, 100)

	test("number[]!", async () => {
		class Moc extends Doc {
			@Field ss?: number[] = [1, 2, 3]
		}
		const doc: Moc = new Moc()
		expect(doc.ss).toEqual([1, 2, 3])
		expect(doc.data()).toEqual({
			"ss": [1, 2, 3]
		})
	}, 100)

	test("caseSensitive", async () => {
		class Moc extends Doc {
			@Field caseSensitive: string = "caseSensitive"
			@Field casESensitive: string = "casESensitive"
			@Field casESensitivE: string = "casESensitivE"
		}
		const doc: Moc = new Moc()
		expect(doc.caseSensitive).toEqual("caseSensitive")
		expect(doc.casESensitive).toEqual("casESensitive")
		expect(doc.casESensitivE).toEqual("casESensitivE")
		expect(doc.data()).toEqual({
			"caseSensitive": "caseSensitive",
			"casESensitive": "casESensitive",
			"casESensitivE": "casESensitivE"
		})
	}, 100)

	test("caseSensitive?", async () => {
		class Moc extends Doc {
			@Field caseSensitive?: string
			@Field casESensitive?: string
			@Field casESensitivE?: string
		}
		const doc: Moc = new Moc()
		expect(doc.caseSensitive).toEqual(null)
		expect(doc.casESensitive).toEqual(null)
		expect(doc.casESensitivE).toEqual(null)
		expect(doc.data()).toEqual({
			"caseSensitive": null,
			"casESensitive": null,
			"casESensitivE": null
		})
	}, 100)

	test("caseSensitive!", async () => {
		class Moc extends Doc {
			@Field caseSensitive?: string = "caseSensitive"
			@Field casESensitive?: string = "casESensitive"
			@Field casESensitivE?: string = "casESensitivE"
		}
		const doc: Moc = new Moc()
		expect(doc.caseSensitive).toEqual("caseSensitive")
		expect(doc.casESensitive).toEqual("casESensitive")
		expect(doc.casESensitivE).toEqual("casESensitivE")
		expect(doc.data()).toEqual({
			"caseSensitive": "caseSensitive",
			"casESensitive": "casESensitive",
			"casESensitivE": "casESensitivE"
		})
	}, 100)

	test("documentReference", async () => {
		class Moc extends Doc {
			@Field d: firebase.firestore.DocumentReference = app.firestore().doc("a/a")
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({ "d": app.firestore().doc("a/a") })
	}, 100)

	test("documentReference?", async () => {
		class Moc extends Doc {
			@Field d?: firebase.firestore.DocumentReference
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({ "d": null })
	}, 100)

	test("documentReference!", async () => {
		class Moc extends Doc {
			@Field d: firebase.firestore.DocumentReference = app.firestore().doc("a/a")
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({ "d": app.firestore().doc("a/a") })
	}, 100)

	test("documentReference[]", async () => {
		class Moc extends Doc {
			@Field d: firebase.firestore.DocumentReference[] = [app.firestore().doc("a/a")]
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({ "d": [app.firestore().doc("a/a")] })
	}, 100)

	test("documentReference[]?", async () => {
		class Moc extends Doc {
			@Field d?: firebase.firestore.DocumentReference[]
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({ "d": null })
	}, 100)

	test("documentReference[]!", async () => {
		class Moc extends Doc {
			@Field d: firebase.firestore.DocumentReference[] = [app.firestore().doc("a/a")]
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({ "d": [app.firestore().doc("a/a")] })
	}, 100)

	test("object", async () => {
		class Moc extends Doc {
			@Field o: { [key: string]: any } = { "a": "b" }
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({ "o": { "a": "b" } })
	}, 100)

	test("object?", async () => {
		class Moc extends Doc {
			@Field o?: { [key: string]: any }
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({ "o": null })
	}, 100)

	test("object!", async () => {
		class Moc extends Doc {
			@Field o?: { [key: string]: any } = { "a": "b" }
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({ "o": { "a": "b" } })
	}, 100)

	test("model", async () => {
		class Sub extends Doc {
			@Field s: string = "s"
		}
		class Moc extends Doc {
			@Field model: Sub = new Sub("a")
		}
		const doc: Moc = new Moc()
		expect(doc.model.s).toEqual("s")
		expect(doc.data()).toEqual({
			"model": {
				"s": "s"
			}
		})
	}, 100)

	test("model?", async () => {
		class Sub extends Doc {
			@Field s?: string
		}
		class Moc extends Doc {
			@Field model?: Sub
		}
		const doc: Moc = new Moc()
		expect(doc.model).toEqual(null)
		expect(doc.data()).toEqual({
			"model": null
		})
	}, 100)

	test("model!", async () => {
		class Sub extends Doc {
			@Field s?: string = "s"
		}
		class Moc extends Doc {
			@Field model?: Sub = new Sub()
		}
		const doc: Moc = new Moc()
		expect(doc.model!.s).toEqual("s")
		expect(doc.data()).toEqual({
			"model": {
				"s": "s"
			}
		})
	}, 100)
})
