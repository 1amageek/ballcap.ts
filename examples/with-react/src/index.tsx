import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase'
import { initialize } from '@1amageek/ballcap'

const firebaseConfig = {
  apiKey: "AIzaSyDnt449K4ylMzkIK7WlJNVYDyao-XL64QA",
  authDomain: "salada-f825d.firebaseapp.com",
  databaseURL: "https://salada-f825d.firebaseio.com",
  projectId: "salada-f825d",
  storageBucket: "salada-f825d.appspot.com",
  messagingSenderId: "1066463947512",
  appId: "1:1066463947512:web:927a91db2d3ff5ea"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
initialize(app)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
