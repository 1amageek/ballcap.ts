import * as firebase from 'firebase-admin'
import * as Ballcap from "../src/index"
import { Doc } from '../src/Document'
import { Field } from '../src/Field'
import { } from "reflect-metadata"

const secret = require("./secret.json")
const app = firebase.initializeApp({
    credential: firebase.credential.cert(secret)
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
		const doc: Moc = Moc.fromData(data, ref as unknown as Ballcap.DocumentReference)
		expect(doc.documentReference.path).toEqual("a/a")
		expect(doc.a).toEqual("a")
		expect(doc.b).toEqual(`bb`)
	}, 100)
})