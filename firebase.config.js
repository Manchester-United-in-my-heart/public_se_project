// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "seproject-920f4.firebaseapp.com",
  projectId: "seproject-920f4",
  storageBucket: "seproject-920f4.appspot.com",
  messagingSenderId: "476809291250",
  appId: "1:476809291250:web:0dcc828782a547236af76b",
  measurementId: "G-930MQYW17F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);