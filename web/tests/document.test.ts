import "reflect-metadata"
import * as firebase from '@firebase/testing'
import * as Ballcap from "../src/index"
import { Doc } from '../src/Document'
import { Field } from '../src/Field'

const app = firebase.initializeAdminApp({
	projectId: "test-project"
})
Ballcap.initialize(app)

describe("Document", () => {

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
		const doc: Moc = new Moc(ref)
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
		const doc: Moc = Moc.fromData(data, ref)
		expect(doc.documentReference.path).toEqual("a/a")
		expect(doc.a).toEqual("a")
		expect(doc.b).toEqual(`bb`)
	}, 100)

	test("fromDataWithIDOverrideModelName", async () => {
		class Moc extends Doc {
			@Field a: string = "a"
			@Field b: string = `bb`
			static modelName(): string {
				return "model"
			}
			modelName(): string {
				return "model"
			}
		}
		const data = {
			a: "a",
			b: "bb"
		}
		const doc: Moc = Moc.fromData(data, "a")
		expect(doc.documentReference.path).toEqual("model/a")
		expect(doc.a).toEqual("a")
		expect(doc.b).toEqual(`bb`)
	}, 100)
})
