import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "@firebase/database";
import { getStorage } from "@firebase/storage";
import { getFirestore } from "@firebase/firestore";

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const app = initializeApp(config);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const firedb = getFirestore(app);

