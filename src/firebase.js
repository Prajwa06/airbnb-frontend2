import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDd3X5d8tkYdrk8Ae_G1Th9gKs-_zi0jtM",
  authDomain: "airbnb-63149.firebaseapp.com",
  projectId: "airbnb-63149",
  storageBucket: "airbnb-63149.appspot.com",
  messagingSenderId: "1075772609355",
  appId: "1:1075772609355:web:d0290338f05956241f0ece",
  measurementId: "G-V06E8SBFB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider};
