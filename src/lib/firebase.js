import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// here i want to import seed file
// import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyDE_wHLsRJh2t6vhAD76mDsjylDqlYojPg",
    authDomain: "instagram-12794.firebaseapp.com",
    projectId: "instagram-12794",
    storageBucket: "instagram-12794.appspot.com",
    messagingSenderId: "1025703290079",
    appId: "1:1025703290079:web:9eb20d17e4472d22b2b56a"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here I want to call the seed file (seed.js) ONLY ONCE!!!
// seedDatabase(firebase);

// console.log('firebase', firebase);

export { firebase, FieldValue}