import * as firebase from 'firebase-admin'
import * as Ballcap from "../src/index"
import { Doc } from '../src/Document'
import { Collection } from '../src/Collection'
import { Field } from '../src/Field'
import { SubCollection } from '../src/SubCollection'
import { Batch } from '../src/Batch'
import { } from "reflect-metadata"

const secret = require("./secret.json")
const app = firebase.initializeApp({
	credential: firebase.credential.cert(secret)
})
Ballcap.initialize(app)


describe("Collection", () => {

	test("CollectionReference", async () => {
		class Sub extends Doc {
			@Field a: string = "a"
			@Field b: string = `bb`
		}
		class Moc extends Doc {
			@SubCollection collection: Collection<Sub> = new Collection()
		}
		const doc: Moc = new Moc("a")
		expect(doc.collection.collectionReference.path).toEqual("moc/a/collection")
	}, 10000)

	test("DocumentReference", async () => {
		class Sub extends Doc {
			@Field a: string = "a"
			@Field b: string = `bb`
		}
		class Moc extends Doc {
			@SubCollection collection: Collection<Sub> = new Collection()
		}
		const doc: Moc = new Moc("a")
		expect(doc.collection.doc("a", Sub).path).toEqual("moc/a/collection/a")
	}, 10000)

	test("SaveUpdateDelete with Batch", async () => {
		class Sub extends Doc {
			@Field a: string = "a"
			@Field b: string = `bb`
		}
		class Moc extends Doc {
			@SubCollection c: Collection<Sub> = new Collection()
		}

		{
			const doc: Moc = new Moc("b")
			const a: Sub = new Sub("a")
			const b: Sub = new Sub("b")
			doc.c.push(a)
			doc.c.push(b)
			const batch = new Batch()
			batch.save(doc.c, doc.c.collectionReference)
			await batch.commit()
		}

		{
			const doc: Moc = new Moc("b")
			const aSnapshot = await doc.c.collectionReference.doc("a").get()
			const a: Sub = Sub.fromSnapshot(aSnapshot)
			expect(a.a).toEqual("a")
			expect(a.b).toEqual("bb")
			a.a = "aa"
			a.b = "bbbb"
			const bSnapshot = await doc.c.collectionReference.doc("b").get()
			const b: Sub = Sub.fromSnapshot(bSnapshot)
			expect(b.a).toEqual("a")
			expect(b.b).toEqual("bb")
			b.a = "aa"
			b.b = "bbbb"

			doc.c.push(a)
			doc.c.push(b)
			const batch = new Batch()
			batch.update(doc.c, doc.c.collectionReference)
			await batch.commit()
		}

		{
			const doc: Moc = new Moc("b")
			const aSnapshot = await doc.c.collectionReference.doc("a").get()
			const a: Sub = Sub.fromSnapshot(aSnapshot)
			expect(a.a).toEqual("aa")
			expect(a.b).toEqual("bbbb")
			a.a = "aa"
			a.b = "bbbb"
			const bSnapshot = await doc.c.collectionReference.doc("b").get()
			const b: Sub = Sub.fromSnapshot(bSnapshot)
			expect(b.a).toEqual("aa")
			expect(b.b).toEqual("bbbb")

			doc.c.push(a)
			doc.c.push(b)
			const batch = new Batch()
			batch.delete(doc.c, doc.c.collectionReference)
			await batch.commit()
		}

		{
			const doc: Moc = new Moc("b")
			const aSnapshot = await doc.c.collectionReference.doc("a").get()
			const bSnapshot = await doc.c.collectionReference.doc("b").get()
			expect(aSnapshot.exists).toEqual(false)
			expect(bSnapshot.exists).toEqual(false)
		}
	}, 10000)

	afterAll(() => {
		app.delete()
	})
})
