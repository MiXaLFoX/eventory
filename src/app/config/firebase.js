import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyADhia_1mBTZQd_diNNaC5fA9bIQ0XH7NU",
  authDomain: "eventory-271421.firebaseapp.com",
  databaseURL: "https://eventory-271421.firebaseio.com",
  projectId: "eventory-271421",
  storageBucket: "eventory-271421.appspot.com",
  messagingSenderId: "707057921033",
  appId: "1:707057921033:web:e682c68e3c18d27de05cd8",
  measurementId: "G-B7SRBMMWGS"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
