import {useState, useEffect} from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDZYR_IuvxilpFwgZXZqtzTY6qA8auTyEU",
    authDomain: "vita-319b7.firebaseapp.com",
    databaseURL: "https://vita-319b7-default-rtdb.firebaseio.com",
    projectId: "vita-319b7",
    storageBucket: "vita-319b7.appspot.com",
    messagingSenderId: "929998147668",
    appId: "1:929998147668:web:f5fb7e9de11e56c4a05dc1",
    measurementId: "G-H1N91K1G42"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  


const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({...doc.data()});
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);

  return {docs};
};

export default useFirestore;
