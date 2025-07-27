import "reflect-metadata"
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import * as Ballcap from "../src/index"
import { Doc } from '../src/Document'
import { Field } from '../src/Field'

// Initialize Firebase app for testing
let app: firebase.app.App
if (!firebase.apps.length) {
	app = firebase.initializeApp({
		projectId: "test-project"
	})
	// Connect to Firestore emulator
	app.firestore().useEmulator('localhost', 8080)
} else {
	app = firebase.app()
}

Ballcap.initialize(app)

describe("Field", () => {

	test("encode", async () => {

		class Base extends Doc {
			@Field base: string = "base"
		}

		class A extends Base {
			@Field a: string = "a"
		}

		class B extends Base {
			@Field b: string = "b"
		}

		class C extends A {
			@Field c: string = "c"
		}

		class D extends B {
			@Field d: string = "d"
		}

		const a: A = new A()
		const b: B = new B()
		const c: C = new C()
		const d: D = new D()

		expect(a.fields()).toEqual(['base', 'a'])
		expect(b.fields()).toEqual(['base', 'b'])
		expect(c.fields()).toEqual(['base', 'a', 'c'])
		expect(d.fields()).toEqual(['base', 'b', 'd'])

	}, 100)

})
