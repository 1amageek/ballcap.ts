import * as firebase from '@firebase/testing'
import { initialize, Codable } from '../src/index'
import { Doc } from '../src/Document'
import { Field } from '../src/Field'
import { } from "reflect-metadata"

const app = firebase.initializeAdminApp({
	projectId: "test-project"
})

initialize(app);

describe("DocumentReference", () => {

	test("encode", async () => {
		class Sub extends Doc {
			@Field a: firebase.firestore.DocumentReference = app.firestore().doc('a/a')
			@Field b: firebase.firestore.DocumentReference = app.firestore().doc('a/b')
		}
		class Moc extends Doc {
			@Field a: firebase.firestore.DocumentReference = app.firestore().doc('a/a')
			@Field b: firebase.firestore.DocumentReference = app.firestore().doc('a/b')
			@Codable(Sub)
			@Field s: Sub = new Sub()
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({
			a: app.firestore().doc('a/a'),
			b: app.firestore().doc('a/b'),
			s: {
				a: app.firestore().doc('a/a'),
				b: app.firestore().doc('a/b'),
			}
		})
		expect(doc.data({ convertDocumentReference: true })).toEqual({
			a: {
				projectId: 'test-project',
				path: 'a/a'
			},
			b: {
				projectId: 'test-project',
				path: 'a/b'
			},
			s: {
				a: {
					projectId: 'test-project',
					path: 'a/a'
				},
				b: {
					projectId: 'test-project',
					path: 'a/b'
				}
			}
		})
	}, 100)

	test("decode", async () => {
		class Sub extends Doc {
			@Field a: firebase.firestore.DocumentReference = app.firestore().doc('a/a')
			@Field b: firebase.firestore.DocumentReference = app.firestore().doc('a/b')
		}
		class Moc extends Doc {
			@Field a: firebase.firestore.DocumentReference = app.firestore().doc('a/a')
			@Field b: firebase.firestore.DocumentReference = app.firestore().doc('a/b')
			@Codable(Sub)
			@Field s: Sub = new Sub()
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({
			a: app.firestore().doc('a/a'),
			b: app.firestore().doc('a/b'),
			s: {
				a: app.firestore().doc('a/a'),
				b: app.firestore().doc('a/b'),
			}
		})
		expect(doc.data({ convertDocumentReference: true })).toEqual({
			a: {
				projectId: 'test-project',
				path: 'a/a'
			},
			b: {
				projectId: 'test-project',
				path: 'a/b'
			},
			s: {
				a: {
					projectId: 'test-project',
					path: 'a/a'
				},
				b: {
					projectId: 'test-project',
					path: 'a/b'
				}
			}
		})
	}, 100)
})
