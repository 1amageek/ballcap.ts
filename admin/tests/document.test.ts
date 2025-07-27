import * as firebase from '@firebase/testing'
import * as Ballcap from "../src/index"
import { Doc } from '../src/Document'
import { Field } from '../src/Field'
import { } from "reflect-metadata"

const app = firebase.initializeAdminApp({
	projectId: "test-project"
})

Ballcap.initialize(app)

describe("Document", () => {

	describe("From name", () => {
		test("id", async () => {
			class Moc extends Doc {
				@Field a: string = "a"
				@Field b: string = `bb`
			}
			const doc: Moc = new Moc("a")
			expect(doc.documentReference.path).toEqual("moc/a")
		}, 100)

		test("documentReference", async () => {
			class Moc extends Doc {
				@Field a: string = "a"
				@Field b: string = `bb`
			}
			const ref: firebase.firestore.DocumentReference = app.firestore().doc("a/a")
			const doc: Moc = new Moc(ref as unknown as Ballcap.DocumentReference)
			expect(doc.documentReference.path).toEqual("a/a")
		}, 100)

		test("fromDataWithID", async () => {
			class Moc extends Doc {
				@Field a: string = "a"
				@Field b: string = `bb`
			}
			const data = {
				a: "a",
				b: "bb"
			}
			const doc: Moc = Moc.fromData(data, "a")
			expect(doc.documentReference.path).toEqual("moc/a")
			expect(doc.a).toEqual("a")
			expect(doc.b).toEqual(`bb`)
		}, 100)

		test("fromDataWithRef", async () => {
			class Moc extends Doc {
				@Field a: string = "a"
				@Field b: string = `bb`
			}
			const data = {
				a: "a",
				b: "bb"
			}
			const ref: firebase.firestore.DocumentReference = app.firestore().doc("a/a")
			const doc: Moc = Moc.fromData(data, ref as unknown as Ballcap.DocumentReference)
			expect(doc.documentReference.path).toEqual("a/a")
			expect(doc.a).toEqual("a")
			expect(doc.b).toEqual(`bb`)
		}, 100)
	})

	describe("From Reference", () => {
		test("id", async () => {
			class Moc extends Doc {
				static collectionReference(): Ballcap.CollectionReference {
					return Ballcap.firestore.collection('mocs')
				}
				@Field a: string = "a"
				@Field b: string = `bb`
			}
			const doc: Moc = new Moc("a")
			expect(doc.documentReference.path).toEqual("mocs/a")
		}, 100)

		test("documentReference", async () => {
			class Moc extends Doc {
				static collectionReference(): Ballcap.CollectionReference {
					return Ballcap.firestore.collection('mocs')
				}
				@Field a: string = "a"
				@Field b: string = `bb`
			}
			const ref: firebase.firestore.DocumentReference = app.firestore().doc("a/a")
			const doc: Moc = new Moc(ref as unknown as Ballcap.DocumentReference)
			expect(doc.documentReference.path).toEqual("a/a")
		}, 100)

		test("fromDataWithID", async () => {
			class Moc extends Doc {
				static collectionReference(): Ballcap.CollectionReference {
					return Ballcap.firestore.collection('mocs')
				}
				@Field a: string = "a"
				@Field b: string = `bb`
			}
			const data = {
				a: "a",
				b: "bb"
			}
			const doc: Moc = Moc.fromData(data, "a")
			expect(doc.documentReference.path).toEqual("mocs/a")
			expect(doc.a).toEqual("a")
			expect(doc.b).toEqual(`bb`)
		}, 100)

		test("fromDataWithRef", async () => {
			class Moc extends Doc {
				static collectionReference(): Ballcap.CollectionReference {
					return Ballcap.firestore.collection('mocs')
				}
				@Field a: string = "a"
				@Field b: string = `bb`
			}
			const data = {
				a: "a",
				b: "bb"
			}
			const ref: firebase.firestore.DocumentReference = app.firestore().doc("a/a")
			const doc: Moc = Moc.fromData(data, ref as unknown as Ballcap.DocumentReference)
			expect(doc.documentReference.path).toEqual("a/a")
			expect(doc.a).toEqual("a")
			expect(doc.b).toEqual(`bb`)
		}, 100)
	})

})
