// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  collection, addDoc, getDocs, query, where, deleteDoc, doc,onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPOmteuOtsYpdIr5E_PKeAubQ4rhdyyfo",
  authDomain: "khatanook-ff949.firebaseapp.com",
  projectId: "khatanook-ff949",
  storageBucket: "khatanook-ff949.firebasestorage.app",
  messagingSenderId: "272238949465",
  appId: "1:272238949465:web:0128bdae4446846fd46d48",
  measurementId: "G-ZF72SWLCLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage,auth };
export { collection, addDoc, getDocs, query, where, deleteDoc, doc,onSnapshot };
