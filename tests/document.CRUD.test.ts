import * as firebase from '@firebase/testing'
import * as Ballcap from "../src/index"
import { Document } from '../src/Document'
import { Field } from '../src/Field'
import { } from "reflect-metadata"
import { Batch } from '../src/Batch';

const app = firebase.initializeAdminApp({
	projectId: "test-project"
})
Ballcap.initialize(app.firestore())

describe("Document CRUD", () => {

	test("SaveUpdateDelete", async () => {
		class Doc extends Document {
			@Field a: string = "a"
			@Field b: string = `bb`
		}
		const doc: Doc = new Doc("a")
		await doc.save()
		const d = await Doc.get("a") as Doc
		expect(d.a).toEqual("a")
		expect(d.b).toEqual("bb")
		d.a = "aa"
		d.b = "bbbb"
		await d.update()
		const _d = await Doc.get("a") as Doc
		expect(_d.a).toEqual("aa")
		expect(_d.b).toEqual("bbbb")
		await _d.delete()
		const del = await Doc.get("a")
		expect(del).toBeUndefined()
	}, 1000)

	test("SaveUpdateDelete with Batch", async () => {
		class Doc extends Document {
			@Field a: string = "a"
			@Field b: string = `bb`
		}

		{
			const doc: Doc = new Doc("b")
			const batch = new Batch()
			batch.save(doc)
			await batch.commit()
		}

		{
			const doc = await Doc.get("b") as Doc
			expect(doc.a).toEqual("a")
			expect(doc.b).toEqual("bb")
			doc.a = "aa"
			doc.b = "bbbb"
			const batch = new Batch()
			batch.update(doc)
			await batch.commit()
		}

		{
			const doc = await Doc.get("b") as Doc
			expect(doc.a).toEqual("aa")
			expect(doc.b).toEqual("bbbb")
			const batch = new Batch()
			batch.delete(doc)
			await batch.commit()
		}

		{
			const doc = await Doc.get("b")
			expect(doc).toBeUndefined()
		}
	}, 1000)

	afterAll(() => {
		app.delete()
	})
})