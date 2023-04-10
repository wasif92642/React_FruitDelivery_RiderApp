import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider , signInWithEmailAndPassword , sendEmailVerification , signInWithPopup ,signOut, sendPasswordResetEmail , createUserWithEmailAndPassword} from "firebase/auth";


export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);



  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth , email, password);
  };

  const log_In = (email, password) => {
    return signInWithEmailAndPassword(auth , email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth , email);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth , provider);
  };



  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    
    currentUser,
    signup,
    logOut,
    log_In,
    resetPassword,
    signInWithGoogle,
    updateEmail,
    updatePassword,

  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
