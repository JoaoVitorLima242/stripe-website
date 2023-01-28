import firebase from 'firebase'
import 'firebase/firebase' // for the db

const config = {
    apiKey: "AIzaSyB2ujEezfpPSlKgbOwLlC4OPMJzkjnT6PQ",
    authDomain: "stripe-website-600e6.firebaseapp.com",
    databaseURL: "https://stripe-website-600e6-default-rtdb.firebaseio.com",
    projectId: "stripe-website-600e6",
    storageBucket: "stripe-website-600e6.appspot.com",
    messagingSenderId: "491900185231",
    appId: "1:491900185231:web:15c51d9c9c0371a7c21efa"
};

firebase.initializeApp(config)

const firestore = firebase.firestore()

export {
    firestore
}