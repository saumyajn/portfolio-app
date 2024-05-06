// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbMUNT0HyhUOn-lP-aLakd6Q1Mu3pe-vo",
  authDomain: "react-portfolio-app6.firebaseapp.com",
  projectId: "react-portfolio-app6",
  storageBucket: "react-portfolio-app6.appspot.com",
  messagingSenderId: "931653672496",
  appId: "1:931653672496:web:e1fd1207eb0f83524217f5",
  measurementId: "G-6VMZL0Z7DJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);