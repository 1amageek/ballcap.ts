import { Model } from '../src/Model'
import { } from "reflect-metadata"


describe("Model", () => {

    test("static Model Name", async () => {
		class Doc extends Model { }
		expect(Doc.modelName()).toEqual("doc")
	}, 100)

	test("Model Name", async () => {
		class Doc extends Model { }
		const doc: Doc = new Doc()
		expect(doc.modelName()).toEqual("doc")
	}, 100)

})