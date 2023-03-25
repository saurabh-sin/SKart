// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJARVE_F1yXi_xRPM7jTbWO2X0N7FVz04",
  authDomain: "se-kart.firebaseapp.com",
  projectId: "se-kart",
  storageBucket: "se-kart.appspot.com",
  messagingSenderId: "677772155283",
  appId: "1:677772155283:web:61ae64c01b365b8cd9b066",
  measurementId: "G-X4V0L4ZQ1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase

export default app;
