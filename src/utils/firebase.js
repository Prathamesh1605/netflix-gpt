// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxWR4fwP1ELnlDeCf5i2ptx8Gp9_y4VGE",
  authDomain: "netflixgpt-39036.firebaseapp.com",
  projectId: "netflixgpt-39036",
  storageBucket: "netflixgpt-39036.firebasestorage.app",
  messagingSenderId: "540424942735",
  appId: "1:540424942735:web:b87701efdfc4d9c4682cfa",
  measurementId: "G-82H3T6MGW7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
