import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { ref, set } from "firebase/database";
import { useAuth } from "../../Context/AuthContext";
import "./Signup_style.css";

import logo from "../../Images/logo.jpg";
import { async } from "@firebase/util";

function Signup() {
  const { signup, logOut, currentUser } = useAuth();

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    confirmpass: "",
  });
  const [ername, setername] = useState();
  const [ermail, setermail] = useState();
  const [erpass, seterpass] = useState();
  const [ercpass, setercpass] = useState();

  const [errorMsg, setErrorMsg] = useState();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  function check() {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[gmail,email,yahoo,hotmail]+(?:\.[com]+)*$/;
    var paswd = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})";

    if (
      (values.name[0] >= "a" && values.name[0] <= "z") ||
      values.name.length < 8
    ) {
      document.getElementById("iname").style.border = "2px solid";
      document.getElementById("iname").style.borderColor = "Red";
      document.getElementById("namepop").style.display = "inline";
      // document.getElementById("iname").style.boxShadow = "-10px 10px 80px red";
      setername("Min length = 8 & Start from Uppercase");

      return;
    } else {
      document.getElementById("iname").style.borderColor = "green";
      // document.getElementById("iname").style.boxShadow = "-10px 10px 80px green";
      setername("");
      document.getElementById("namepop").style.display = "none";
      if (values.email.match(validRegex)) {
        document.getElementById("imail").style.border = "2px solid green";

        document.getElementById("emailpop").style.display = "none";

        setermail("");

        if (values.pass.match(paswd)) {
          document.getElementById("ipass1").style.border = "2px solid green";
          document.getElementById("passpop").style.display = "none";
          seterpass("");
          if (values.confirmpass.match(paswd)) {
            document.getElementById("ipass2").style.border = "2px solid green";
            setErrorMsg("");
            return;
          } else {
            document.getElementById("ipass2").style.border = "2px solid red";

            return;
          }
        } else {
          document.getElementById("ipass1").style.border = "2px solid red";
          document.getElementById("passpop").style.display = "inline";
          seterpass("9 Digits contain 1 (Degits, Upp/Low case, Special Cha)");

          return;
        }
      } else {
        document.getElementById("imail").style.border = "2px solid red";

        document.getElementById("emailpop").style.display = "inline";
        setermail("Incorrect Email Formate");

        return;
      }
    }
  }

  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    } else if (values.pass !== values.confirmpass) {
      setErrorMsg("Password Doesn't Match");
      return;
    }

    setErrorMsg("");

    setSubmitButtonDisabled(true);

    signup(values.email, values.pass)
      .then(() => {
        set(ref(db, "users/" + auth.currentUser.uid), {
          Name: values.name,
          email: values.email,
        });

        alert("Register Succesfull");

        navigate("/login");
      })

      .catch((err) => {
        setSubmitButtonDisabled(false);
        if (err.message == "Firebase: Error (auth/email-already-in-use).") {
          setErrorMsg("Email is Already in Use");
        } else {
          setErrorMsg(err.message);
        }
      });
  };

  return (
    <div className="wrapper_Signup">
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-2" />
            <div className="col-9" id="signup_form">
              <div className="row">
                <h1>Signup</h1>
              </div>
              <div className="row">
                <label>
                  Name *{" "}
                  <sub className="dangerr" id="namepop">
                    {ername}
                  </sub>
                </label>
                <br />
                <br />
                <input
                  placeholder="Enter your name "
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, name: event.target.value }))
                  }
                  onClick={() => setErrorMsg("")}
                  onKeyUp={check}
                  id="iname"
                />
              </div>

              <div className="row">
                <label>
                  Email *{" "}
                  <sub className="dangerr" id="emailpop">
                    {ermail}
                  </sub>
                </label>
                <br />
                <br />
                <input
                  placeholder="Enter email address "
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  onKeyUp={check}
                  id="imail"
                />
              </div>
              <div className="row">
                <label>
                  Password *{" "}
                  <sub className="dangerr" id="passpop">
                    {erpass}
                  </sub>{" "}
                </label>
                <br />
                <br />

                <input
                  type="Password"
                  placeholder="Enter Password"
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, pass: event.target.value }))
                  }
                  id="ipass1"
                  onKeyUp={check}
                />
              </div>

              <div className="row">
                <label>Confirm Password * </label>
                <br />
                <br />
                <input
                  type="Password"
                  placeholder="Confirm Password"
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      confirmpass: event.target.value,
                    }))
                  }
                  id="ipass2"
                  onKeyUp={check}
                />
              </div>

              <div className="row" id="footer">
                <b className="error">{errorMsg}</b>
                <button
                  onClick={handleSubmission}
                  disabled={submitButtonDisabled}
                >
                  Signup
                </button>

                <p>
                  <br />
                  Already have an account?{" "}
                  <span>
                    <Link to="/login">Login</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
