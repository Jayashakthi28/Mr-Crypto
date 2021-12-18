// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBIB-RV44vS56Z4rw_WtHT2sJaVgz7itSs",
  authDomain: "mr-crypto-59884.firebaseapp.com",
  databaseURL: "https://mr-crypto-59884-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mr-crypto-59884",
  storageBucket: "mr-crypto-59884.appspot.com",
  messagingSenderId: "282395164816",
  appId: "1:282395164816:web:8bda5e1586dfef3c381815",
  measurementId: "G-YBLKN0HWWE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);