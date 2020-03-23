import * as firebase from 'firebase-admin'
import * as Ballcap from '../src/index'
import { Doc } from '../src/Document'
import { Field } from '../src/Field'
import { } from "reflect-metadata"
import { Batch } from '../src/Batch'

const secret = require("./secret.json")
const app = firebase.initializeApp({
	credential: firebase.credential.cert(secret)
})
Ballcap.initialize(app)

describe("Doc CRUD", () => {

	test("SaveUpdateDelete", async () => {
		class Moc extends Doc {
			@Field a: string = "a"
			@Field b: string = `bb`
		}
		const doc: Moc = new Moc("a")
		await doc.save()
		const d = await Moc.get("a") as Moc
		expect(d.a).toEqual("a")
		expect(d.b).toEqual("bb")
		d.a = "aa"
		d.b = "bbbb"
		await d.update()
		const _d = await Moc.get("a") as Moc
		expect(_d.a).toEqual("aa")
		expect(_d.b).toEqual("bbbb")
		await _d.delete()
		const del = await Moc.get("a")
		expect(del).toBeUndefined()
	}, 10000)

	test("SaveUpdateDelete with Batch", async () => {
		class Moc extends Doc {
			@Field a: string = "a"
			@Field b: string = `bb`
		}

		{
			const doc: Moc = new Moc("b")
			const batch = new Batch()
			batch.save(doc)
			await batch.commit()
		}

		{
			const doc: Moc = await new Moc("b").fetch()
			expect(doc.a).toEqual("a")
			expect(doc.b).toEqual("bb")
			doc.a = "aa"
			doc.b = "bbbb"
			const batch = new Batch()
			batch.update(doc)
			await batch.commit()
		}

		{
			const doc = await Moc.get("b") as Moc
			expect(doc.a).toEqual("aa")
			expect(doc.b).toEqual("bbbb")
			const batch = new Batch()
			batch.delete(doc)
			await batch.commit()
		}

		{
			const doc = await Moc.get("b")
			expect(doc).toBeUndefined()
		}
	}, 10000)

	test("InheritedMoc SaveUpdateDelete with Batch", async () => {
		class Moc extends Doc {
			@Field a: string = "a"
			@Field b: string = `bb`
		}

		class InheritedMoc extends Moc {}

		{
			const doc: InheritedMoc = new InheritedMoc("b")
			const batch = new Batch()
			batch.save(doc)
			await batch.commit()
		}

		{
			const doc: InheritedMoc = await new InheritedMoc("b").fetch()
			expect(doc.a).toEqual("a")
			expect(doc.b).toEqual("bb")
			doc.a = "aa"
			doc.b = "bbbb"
			const batch = new Batch()
			batch.update(doc)
			await batch.commit()
		}

		{
			const doc = await InheritedMoc.get("b") as InheritedMoc
			expect(doc.a).toEqual("aa")
			expect(doc.b).toEqual("bbbb")
			const batch = new Batch()
			batch.delete(doc)
			await batch.commit()
		}

		{
			const doc = await InheritedMoc.get("b")
			expect(doc).toBeUndefined()
		}
	}, 10000)

	afterAll(() => {
		app.delete()
	})
})
