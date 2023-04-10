import "./Login_style.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { confirmPasswordReset, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

function Login() {
  const passwordField = document.getElementById("password");
  const togglePassword = document.getElementById("toggle-password");

  const [collectionData, setCollectionData] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.0.109:3000/gg")
      .then((response) => {
        setCollectionData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  const show_pass = () => {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      togglePassword.textContent = "Hide";
    } else {
      passwordField.type = "password";
      togglePassword.textContent = "Show";
    }
  };

  const [login_mail, set_login] = useState("");
  const [pass, setpass] = useState("");

  const [error, setError] = useState("");

  const { log_In, signInWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  const Login_with_email = () => {


    for (let i = 0; i < collectionData.length; i++) {
      if (collectionData[i].email == login_mail) {
        log_In(login_mail, pass)
          .then(() => {
            navigate("/");

            setError("");
          })

          .catch((error) => {
            switch (error.code) {
              case "auth/invalid-email": {
                setError("Invalid Email Address");
                break;
              }
              case "auth/user-not-found": {
                setError("User Not Found");
                break;
              }

              case "auth/wrong-password": {
                setError("Password is incorrect");
                break;
              }
            }
          });
      }

         else{
      console.log("only Rider Accounts Allow")
    }


    }

 
  };

  const LoginWithGoogle = async () => {
    await signInWithGoogle()
      .then(() => {
        navigate("/");
        setError("");
      })
      .catch(() => {
        setError("Failed to log in With Google");
      });
  };

  return (
    <div className="wrapper-login">
      <div className="row" style={{ padding: "2rem", paddingTop: "12rem" }}>
        <div className="col-2" />
        <div className="col-5" id="login_form">
          <div className="row">
            <form style={{ width: "100%" }}>
              <h1 onClick={()=>{console.log(collectionData)}}>Log-in</h1>
              {error && <alert className="danger">{error}</alert>}
              <br />
              <label Email address />
              <input
                onChange={(e) => {
                  set_login(e.target.value);
                }}
                type="email"
                placeholder="Enter email"
              />
              <br /> <br />
              <br />
              <label Password />
              <input
                onChange={(e) => {
                  setpass(e.target.value);
                }}
                type="password"
                placeholder="Password"
                name="password"
                id="password"
              />
              <span
                toggle="#password"
                class="fa fa-fw fa-eye field-icon toggle-password"
                onClick={show_pass}
              ></span>
              <br />
              <br />
              <br />
              <button className="bt2" type="button" onClick={()=>{Login_with_email()}}>
                Log In
              </button>
              <br />
       
              <button onClick={LoginWithGoogle} className="bt1" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
                Sign in With google
              </button>
              <br />
            
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

{
  /* <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}> */
}
// <h1 className="text-center mb-4">Log In</h1>
// {error && <Alert variant="danger">{error}</Alert>}
// <Form.Group className="mb-3">
//   <Form.Label>Email address</Form.Label>
//   <Form.Control
//     {...register("email")}
//     type="email"
//     placeholder="Enter email"
//   />
// </Form.Group>

// <Form.Group className="mb-3">
//   <Form.Label>Password</Form.Label>
//   <Form.Control
//     {...register("password")}
//     type="password"
//     placeholder="Password"
//   />
// </Form.Group>
// <div className="text-center my-2">

// </div>
// <Button
//   className={styles.bt2}
//   variant="primary"
// type="submit"
// >
//   Log In
// </Button>
// <div className="d-flex flex-column gap-1 justify-content-center align-items-center">
//   <Button
//     onClick={handelLoginWithGoogle}
//     className={styles.bt1}
//     type="button"

//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="18"
//       height="18"
//       fill="currentColor"
//       className="bi bi-google"
//       viewBox="0 0 16 16"
//     >
//       <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
//     </svg>
//     Sign in With google
//   </Button>

// </div>
// <p className="text-center mt-3">
//   Do you have account?{" "}
//   <Link className="text-decoration-none" to="/Register">
//     Sign Up
//   </Link>
// </p>
// </form>
