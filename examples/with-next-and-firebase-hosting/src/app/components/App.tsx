import Header from './Header'
import ItemList from './ItemList'

import React from 'react'
import firebase from 'firebase'
import '@firebase/firestore'
import * as Ballcap from '@1amageek/ballcap'
import config from '../firebase-config'

if(firebase.apps.length === 0) {
  Ballcap.initialize(firebase.initializeApp(config).firestore())
}

const App = ({ children }: { children?: any }) => (
  <main>
    <Header />
    {children}
  </main>
)

export default App
