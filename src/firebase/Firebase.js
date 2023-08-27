import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import 'firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBD9ZQk07PN9c0gmw3-OdzNoB6XQPDOuW0",
  authDomain: "chess-56b9a.firebaseapp.com",
  projectId: "chess-56b9a",
  storageBucket: "chess-56b9a.appspot.com",
  messagingSenderId: "828571720710",
  appId: "1:828571720710:web:d2d240ca5540aaa5193787"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);
export { app, db, storage }

export const addToCollection = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), data)
  return { id: docRef.id};
}

