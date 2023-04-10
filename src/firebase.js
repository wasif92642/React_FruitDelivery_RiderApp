import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "@firebase/database";
import { getStorage } from "@firebase/storage";
import { getFirestore } from "@firebase/firestore";

const config = {
  apiKey: "AIzaSyDZYR_IuvxilpFwgZXZqtzTY6qA8auTyEU",
  authDomain: "vita-319b7.firebaseapp.com",
  databaseURL: "https://vita-319b7-default-rtdb.firebaseio.com",
  projectId: "vita-319b7",
  storageBucket: "vita-319b7.appspot.com",
  messagingSenderId: "929998147668",
  appId: "1:929998147668:web:f5fb7e9de11e56c4a05dc1",
  measurementId: "G-H1N91K1G42",
};

const app = initializeApp(config);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const firedb = getFirestore(app);

