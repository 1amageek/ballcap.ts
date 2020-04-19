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
			@Field s: Sub = new Sub('subid')
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
		expect(doc.data({ convertDocument: true })).toEqual({
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
		expect(doc.data({ convertDocumentReference: true, convertDocument: true })).toEqual({
			a: {
				projectId: 'test-project',
				path: 'a/a'
			},
			b: {
				projectId: 'test-project',
				path: 'a/b'
			},
			s: {
				id: 'subid',
				path: 'sub/subid',
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
			@Codable(Sub)
			@Field s!: Sub
		}
		const converted: Moc = Moc.fromData({
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
		}, undefined, { convertDocumentReference: true })

		expect(converted.data()).toEqual({
			a: app.firestore().doc('a/a'),
			b: app.firestore().doc('a/b'),
			s: {
				a: app.firestore().doc('a/a'),
				b: app.firestore().doc('a/b'),
			}
		})

		const convertedFromData: Moc = Moc.fromData({
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
		}, undefined, { convertDocumentReference: true })

		expect(convertedFromData.data()).toEqual({
			a: app.firestore().doc('a/a'),
			b: app.firestore().doc('a/b'),
			s: {
				a: app.firestore().doc('a/a'),
				b: app.firestore().doc('a/b'),
			}
		})

		const doc: Moc = Moc.fromData({
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
		expect(doc.data()).toEqual({
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

		const docFromData: Moc = Moc.fromData({
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
		expect(docFromData.data()).toEqual({
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
		}, undefined, { convertDocumentReference: true, convertDocument: true })

		expect(convertedDocFromData.data()).toEqual({
			a: app.firestore().doc('a/a'),
			b: app.firestore().doc('a/b'),
			s: {
				a: app.firestore().doc('a/a'),
				b: app.firestore().doc('a/b'),
			}
		})

		expect(convertedDocFromData.s.id).toEqual('id')

		expect(convertedDocFromData.s.path).toEqual('sub/id')

	}, 100)
})
