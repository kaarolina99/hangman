import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "DIN_API_KEY",
  authDomain: "DITT_PROSJEKT.firebaseapp.com",
  projectId: "DITT_PROSJEKT_ID",
  storageBucket: "DITT_PROSJEKT.appspot.com",
  messagingSenderId: "XXX",
  appId: "XXX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
