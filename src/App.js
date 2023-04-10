import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";

import Home from "./Pages/Home.js";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import ForgetPassword from "./Components/Forgetpassword/Forget";
import PrivateRoute from "./Components/PrivateRoute";
import PrivateRoute2 from "./Components/PrivateRoute2";
import Nav from "./Components/Nav/Nav";
import AddProduct from "./Components/Addproduct/Addproduct";

import AuthProvider, { useAuth } from "./Context/AuthContext";

import "./App.css";
import ManageRider from "./Components/Addproduct/ManageRider";
import Rider_Order from "./Pages/Rider_Order";

function App() {
  function CheckLogin({ children }) {
    const { currentUser } = useAuth();

    if (currentUser) {
      return <Navigate to="/" />;
    }

    return children;
  }

  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute2>
                  <Home />
                </PrivateRoute2>
              }
            />
            <Route
              path="/login"
              element={
                <CheckLogin>
                  <Login />
                </CheckLogin>
              }
            />
            
            <Route path="/Nav" element={<Nav />} />
            <Route path="/Register" element={<Signup />} />
       
          
            <Route path="/RiderOrder" element={      <PrivateRoute2><Rider_Order /> </PrivateRoute2>} />
            
            <Route path="/adp" element={<PrivateRoute><AddProduct /></PrivateRoute> } />
            <Route path="/MRider" element={<ManageRider/>} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />

          
            {/* <Route path="/Nav" element={<Nav/>} /> */}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
