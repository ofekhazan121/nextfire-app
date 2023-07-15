// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { initializeApp } from 'firebase/app';
// import { getAuth } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";

//
// const app = initializeApp(firebaseConfig)
// export const auth = getAuth(app)
//
// export const db = getFirestore(app);
// export const googleAuthProvider = new GoogleAuthProvider();
// export const firestore = getFirestore(app)
// export const storage = getStorage(app);
//
// export default app



import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAfrxvj8sDYOBFK9ufDTV3MQUnbnVZAlmk",
    authDomain: "nextfire-f01de.firebaseapp.com",
    projectId: "nextfire-f01de",
    storageBucket: "nextfire-f01de.appspot.com",
    messagingSenderId: "1094657355755",
    appId: "1:1094657355755:web:2ce325400ab2eee33f33ae",
    measurementId: "G-9G3H1QN8Q0"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
    const data = doc.data();
    return {
        ...data,
        // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
        createdAt: data?.createdAt.toMillis() || 0,
        updatedAt: data?.updatedAt.toMillis() || 0,
    };
}