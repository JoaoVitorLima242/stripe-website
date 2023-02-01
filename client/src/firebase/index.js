import firebase from 'firebase/app';
import 'firebase/firestore'; // for the db
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB2ujEezfpPSlKgbOwLlC4OPMJzkjnT6PQ",
  authDomain: "stripe-website-600e6.firebaseapp.com",
  databaseURL: "https://stripe-website-600e6-default-rtdb.firebaseio.com",
  projectId: "stripe-website-600e6",
  storageBucket: "stripe-website-600e6.appspot.com",
  messagingSenderId: "491900185231",
  appId: "1:491900185231:web:15c51d9c9c0371a7c21efa"
}

firebase.initializeApp(config);

const firestore = firebase.firestore();
const auth = firebase.auth();

const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) { return };

  const userRef = firestore.doc(`users/${userAuth.uid}`) //users/uniq26535
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

export {
  firestore,
  createUserProfileDocument,
  auth,
}