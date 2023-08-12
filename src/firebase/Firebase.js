import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import 'firebase/auth';
import 'firebase/firestore';
import { getStorage } from "firebase/storage";


  const firebaseConfig = {
    apiKey: "AIzaSyBjufmG9u9SZg3YUq5QifIJleCOleVAQa4",
    authDomain: "chessapp-ced05.firebaseapp.com",
    projectId: "chessapp-ced05",
    storageBucket: "chessapp-ced05.appspot.com",
    messagingSenderId: "894247559700",
    appId: "1:894247559700:web:cd67f3a56d02cf95a03d01",
    measurementId: "G-VV3062245X"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()
const storage = getStorage(app);
export { app, auth, db, storage }


