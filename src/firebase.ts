import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-7I3Q0jc7-OYBDyIwgHi02oSsCNLAR_U",
  authDomain: "hangman-bee51.firebaseapp.com",
  projectId: "hangman-bee51",
  storageBucket: "hangman-bee51.appspot.com",
  messagingSenderId: "161832481291",
  appId: "1:161832481291:web:ec347415a48d14655c4d0e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
