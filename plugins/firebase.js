import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.firebaseApiUrl,
  authDomain: process.env.firebaseAuthDomain,
  storageBucket: process.env.firebaseStorageBucket
};
firebase.initializeApp(config);
firebase.initializeApp(config, 'AdminApp');
