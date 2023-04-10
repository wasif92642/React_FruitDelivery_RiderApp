import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import './Forget_style.css';

function ForgetPassword() {
  const [reset_email , set_reset_email] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  const Reset_mail = async () => {
   
      setError("");
      await resetPassword(reset_email).then(()=>{


        setMessage("Check your inbox for further instructions");

      }).catch((error)=>{
        switch (error.code) {
          case "auth/invalid-email":
            {
              setMessage("Invalid Email Address");
              break;
            }
          case "auth/user-not-found":

          {
            setMessage("User Not Found");
            break;
          }
        }})
          
  };
  return (
    <div className="wrapper_forget">
      <div className="row">
        
        
            <div className="col-3"></div>


    <div className="col-6" id="forget_form">

    <form style={{ width: "100%" }}>
      <h1 className="text-center">Reset Password</h1>
      {error && <alert className="danger">{error}</alert>}
      {message && <alert className="success">{message}</alert>}
      <br/><br/>
     
        <label>Email address : </label>
        <br/><br/><br/><br/>
          <input
          onChange={(e)=>{set_reset_email(e.target.value)}}
          type="email"
          placeholder="Enter email"
        />

      <button
        className="bt1"
        type="button"
        onClick={Reset_mail}
      >
        Reset Password
      </button>
      
        <Link className="col-12 footer" to="/login">
          Back to login
        </Link>
      
    </form>
    </div>
    </div>
    </div>

  );
}

export default ForgetPassword;
