import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyCuA0x7MGe5fRfYprSIX9zn_pi-YqNHym8",
    authDomain: "photo-feed-ce973.firebaseapp.com",
    databaseURL: "https://photo-feed-ce973.firebaseio.com",
    projectId: "photo-feed-ce973",
    storageBucket: "photo-feed-ce973.appspot.com",
    messagingSenderId: "427634518785"
  };


firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();