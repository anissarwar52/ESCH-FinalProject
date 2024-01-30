// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';







// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrBknmlqRTmQaQhBbWSW--DNrzmS4eDyY",
    authDomain: "supplychain-4ac78.firebaseapp.com",
    projectId: "supplychain-4ac78",
    storageBucket: "supplychain-4ac78.appspot.com",
    messagingSenderId: "373595283122",
    appId: "1:373595283122:web:05638fda3488479f8333ab"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig, "app");

 
const firestore = getFirestore(app);

export {firestore, app}
