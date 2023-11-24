// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cw-realestate.firebaseapp.com",
  projectId: "cw-realestate",
  storageBucket: "cw-realestate.appspot.com",
  messagingSenderId: "251265397112",
  appId: "1:251265397112:web:b9d88b51c92ae0ccd2588d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);