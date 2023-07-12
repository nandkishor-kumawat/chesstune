import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import 'firebase/auth';
import 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSYR4Is-EJ2HmdQiJHwQEX2HPwEOV70Ow",
  authDomain: "chesstune-9196a.firebaseapp.com",
  projectId: "chesstune-9196a",
  storageBucket: "chesstune-9196a.appspot.com",
  messagingSenderId: "677052425653",
  appId: "1:677052425653:web:3a55992558030e9df465fc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()
const storage = getStorage(app);
export { app, auth, db, storage }



