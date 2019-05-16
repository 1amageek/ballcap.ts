import * as firebase from '@firebase/testing'
import * as Ballcap from "../src/index"
import { Doc } from '../src/Document'
import { Field } from '../src/Field'
import { } from "reflect-metadata"

const app = firebase.initializeAdminApp({
	projectId: "test-project"
})
Ballcap.initialize(app.firestore(), app.firestore().collection("version").doc("1"))

describe("Document", () => {

	test("id", async () => {
		class Moc extends Doc {
			@Field a: string = "a"
			@Field b: string = `bb`
		}
		const doc: Moc = new Moc("a")
		expect(doc.documentReference.path).toEqual("version/1/moc/a")
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
		expect(doc.documentReference.path).toEqual("version/1/moc/a")
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
})