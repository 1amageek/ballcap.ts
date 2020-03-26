import * as firebase from 'firebase'

export class App {
	private static app: App;
	private constructor() { }
	static shared() {
			if (!App.app) {
				App.app = new App();
			}
			return App.app;
	}

	firebaseApp: firebase.app.App | any

	set(app: firebase.app.App | any) {
		this.firebaseApp = app
	}

	firestore() {
		return this.firebaseApp.firestore()
	}
}
