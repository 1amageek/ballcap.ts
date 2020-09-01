import * as firebase from 'firebase-admin'

export class App {
	private static app: App
	private constructor() { }
	static shared() {
			if (!App.app) {
				App.app = new App()
			}
			return App.app
	}

	firebaseApp: firebase.app.App | any

	firestore!: firebase.firestore.Firestore

	set(app: firebase.app.App | any, firestore: firebase.firestore.Firestore) {
		this.firebaseApp = app
		this.firestore = firestore ?? app.firestore()
	}
}
