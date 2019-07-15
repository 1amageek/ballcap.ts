import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from 'firebase'
import '@firebase/firestore'
import * as Ballcap from '@1amageek/ballcap'
import config from './firebase-config'

const app = firebase.initializeApp(config)
Ballcap.initialize(app.firestore())

import ItemList from './components/ItemList';

export default function App() {
  return (
    <View style={styles.container}>
      <ItemList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 120,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
