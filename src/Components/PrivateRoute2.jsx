import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import {auth} from "../firebase";
function PrivateRoute2({ children }) {

    


  const { currentUser} = useAuth();

  if (!currentUser) {

    return <Navigate to="/login" />;
  }
 
  else if(currentUser.email == "ali913888@gmail.com"){
    return <Navigate to="/adp" />;
  }


  return children;
}

export default PrivateRoute2;
