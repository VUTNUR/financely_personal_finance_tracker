// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAXVSFNcX-jO4a1mK2sLKtGwMhlUjp6J8",
  authDomain: "financely-27b2e.firebaseapp.com",
  projectId: "financely-27b2e",
  storageBucket: "financely-27b2e.appspot.com",
  messagingSenderId: "923641439770",
  appId: "1:923641439770:web:ca0506ad00305e8fb993a3",
  measurementId: "G-3S9PPE1B12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };