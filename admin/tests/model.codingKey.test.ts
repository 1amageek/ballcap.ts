import { Model } from '../src/Model'
import { } from "reflect-metadata"
import { Field } from '../src/Field'
import { Codable } from '../src/Codable'
import { File } from '../src/File'


describe("CodingKey test", () => {

	test("Encode", async () => {

		class Sub extends Model {
			@Field s: string = "abc"
		}

		class Doc extends Model {
			@Field s: string = "abc"
			@Field n: number = 123
			@Field b: boolean = false
			@Field ss: string[] = ["a", "b", "c"]
			@Field nn: number[] = [1, 2, 3]
			@Field o: { [key: string]: any } = { a: "b" }
			@Field f: File = new File()
			@Field ff: File[] = [new File()]
			@Codable(Sub)
			@Field d: Sub = new Sub()
			@Codable(Sub)
			@Field dd: Sub[] = [new Sub()]

			public codingKeys(): { [localKey: string]: string } {
				return {
					s: "_s",
					n: "_n",
					b: "_b",
					ss: "_ss",
					nn: "_nn",
					o: "_o",
					f: "_f",
					ff: "_ff",
					d: "_d",
					dd: "_dd"
				}
			}
		}
		const d: Doc = new Doc()
		expect(d.data()).toEqual(
			{
				"_b": false,
				"_d": { s: "abc" },
				"_dd": [{ s: "abc" }],
				"_f": {
					"mimeType": "",
					"path": "",
					"metadata": null,
					"url": null
				},
				"_ff": [{
					"mimeType": "",
					"path": "",
					"metadata": null,
					"url": null
				}],
				"_n": 123,
				"_nn": [1, 2, 3],
				"_o": { a: "b" },
				"_s": "abc",
				"_ss": ["a", "b", "c"]
			}
		)
	}, 100)

	test("Decode", async () => {

		class Sub extends Model {
			@Field s: string = "abc"
		}

		class Doc extends Model {
			@Field s?: string
			@Field n?: number
			@Field b?: boolean
			@Field ss?: string[]
			@Field nn?: number[]
			@Field o?: { [key: string]: any }
			@Field f?: File
			@Field ff?: File[]
			@Codable(Sub)
			@Field d?: Sub
			@Codable(Sub)
			@Field dd?: Sub[]

			public codingKeys(): { [localKey: string]: string } {
				return {
					s: "_s",
					n: "_n",
					b: "_b",
					ss: "_ss",
					nn: "_nn",
					o: "_o",
					f: "_f",
					ff: "_ff",
					d: "_d",
					dd: "_dd"
				}
			}
		}
		const d: Doc = Doc.from({
			"_b": false,
			"_d": { s: "abc" },
			"_dd": [{ s: "abc" }],
			"_f": {
				"mimeType": "",
				"path": "",
				"metadata": null,
				"url": null
			},
			"_ff": [{
				"mimeType": "",
				"path": "",
				"metadata": null,
				"url": null
			}],
			"_n": 123,
			"_nn": [1, 2, 3],
			"_o": { a: "b" },
			"_s": "abc",
			"_ss": ["a", "b", "c"]
		})

		expect(d.s).toEqual("abc")
		expect(d.n).toEqual(123)
		expect(d.b).toEqual(false)
		expect(d.ss).toEqual(["a", "b", "c"])
		expect(d.nn).toEqual([1, 2, 3])
		expect(d.o).toEqual({ a: "b" })
		expect(d.f).toEqual(new File())
		expect(d.ff).toEqual([new File()])
		expect(d.d).toEqual(new Sub())
		expect(d.dd).toEqual([new Sub()])
	}, 100)
})
