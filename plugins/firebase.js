import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

function setup() {
  if (firebase.apps.length > 0) return;

  const config = {
    apiKey: process.env.firebaseApiUrl,
    authDomain: process.env.firebaseAuthDomain,
    storageBucket: process.env.firebaseStorageBucket
  };
  firebase.initializeApp(config);
  firebase.initializeApp(config, 'AdminApp');
}

setup();
