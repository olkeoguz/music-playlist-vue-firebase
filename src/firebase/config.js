import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {

  // In order to run the app, these fields must be set.

  // apiKey: ,
  // authDomain: ,
  // projectId: ,
  // storageBucket: ,
  // messagingSenderId: ,
  // appId: ,
 
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth,projectStorage,timestamp, };
