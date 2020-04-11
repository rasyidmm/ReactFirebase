import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCdbJ7U6VZEQcfE-4Gb_Rol3g3x9PXGsYk",
    authDomain: "simple-note-firebase-5016f.firebaseapp.com",
    databaseURL: "https://simple-note-firebase-5016f.firebaseio.com",
    projectId: "simple-note-firebase-5016f",
    storageBucket: "simple-note-firebase-5016f.appspot.com",
    messagingSenderId: "739074494933",
    appId: "1:739074494933:web:6596a860ec5ca1206e6d5c",
    measurementId: "G-NWEGPGEPRK"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export const database =  firebase.database();
export default firebase;