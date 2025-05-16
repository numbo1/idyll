// firebase.js
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, get, child, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDDbWAlPBNh4vnIRMzGq1hHDJSOB48H83A",
  authDomain: "idyll-f6405.firebaseapp.com",
  databaseURL: "https://idyll-f6405-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "idyll-f6405",
  storageBucket: "idyll-f6405.appspot.com",
  messagingSenderId: "820088340754",
  appId: "1:820088340754:web:525f3f5fa2af8c50cf33cb",
  measurementId: "G-EPNK7242P4"
};

// Sjekk om Firebase allerede er initialisert
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth, ref, set, get, child, push, onAuthStateChanged, setPersistence, browserLocalPersistence, initializeApp, getDatabase, getAuth, onValue, remove, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword };
export default firebaseConfig;
