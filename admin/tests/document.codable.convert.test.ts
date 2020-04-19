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
			@Codable(Sub, true)
			@Field s: Sub = new Sub('subid')
		}
		const doc: Moc = new Moc()
		expect(doc.data()).toEqual({
			a: app.firestore().doc('a/a'),
			b: app.firestore().doc('a/b'),
			s: {
				id: 'subid',
				path: 'sub/subid',
				data: {
					a: app.firestore().doc('a/a'),
					b: app.firestore().doc('a/b'),
				}
			}
		})
	}, 100)

	test("decode", async () => {
		class Sub extends Doc {
			@Field a!: firebase.firestore.DocumentReference
			@Field b!: firebase.firestore.DocumentReference
		}
		class Moc extends Doc {
			@Field a!: firebase.firestore.DocumentReference
			@Field b!: firebase.firestore.DocumentReference
			@Codable(Sub, true)
			@Field s: Sub = new Sub('subid')
		}
		const convertedDocFromData: Moc = Moc.fromData({
			a: {
				projectId: 'test-project',
				path: 'a/a'
			},
			b: {
				projectId: 'test-project',
				path: 'a/b'
			},
			s: {
				id: 'id',
				path: 'sub/id',
				data: {
					a: {
						projectId: 'test-project',
						path: 'a/a'
					},
					b: {
						projectId: 'test-project',
						path: 'a/b'
					}
				}
			}
		}, undefined, { convertDocumentReference: true })

		expect(convertedDocFromData.data()).toEqual({
			a: app.firestore().doc('a/a'),
			b: app.firestore().doc('a/b'),
			s: {
				id: 'id',
				path: 'sub/id',
				data: {
					a: app.firestore().doc('a/a'),
					b: app.firestore().doc('a/b'),
				}
			}
		})

		expect(convertedDocFromData.s.id).toEqual('id')
		expect(convertedDocFromData.s.path).toEqual('sub/id')
		expect(convertedDocFromData.s.data()).toEqual({
			a: app.firestore().doc('a/a'),
			b: app.firestore().doc('a/b'),
		})

	}, 100)
})
