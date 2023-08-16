import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


//import css
import "../styles/login.css";

//fire base providers
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase";

//import logos
import googleLogo from "../icons/google-logo.png";

function Login() {

  const navigate = useNavigate()

  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  //Maintain login
  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if(user) {
        navigate("/news")
      }
    })
  }, [])


  //sign in with user name and mail id
  const loginUsingEmailButton = (event) => {
    if (email.length === 0 || password.length === 0) {
      document.querySelector(".alert").style.display = "block";
      setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
      }, 3000);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          // localStorage.setItem("email", result.user.email);
          // localStorage.setItem("displayName", result.user.displayName);
          // localStorage.setItem("photoUrl", result.user.photoUrl);
          navigate("/news");
        })
        .catch((error) => {
          let err = error.message;
          err = err.split("/")[1].replace(")", ".");
          setError(err);
          document.querySelector(".alert").style.display = "block";
          setTimeout(() => {
            document.querySelector(".alert").style.display = "none";
          }, 3000);
        });
    }

    event.preventDefault();
  };

  //sign in with google
  const googleProvider = new GoogleAuthProvider();
  const loginUsingGoogleButton = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        localStorage.setItem("email", result.user.email);
        localStorage.setItem("displayName", result.user.displayName);
        localStorage.setItem("photoUrl", result.user.photoUrl);
        navigate("/news");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="loginPage">
      <h1 className="loginHeading">Welcome to the Personalized news</h1>

      <form action="none" className="loginForm">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="******"
          required
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="loginFormButton" onClick={loginUsingEmailButton}>
          Continue
        </button>
      </form>

      <button className="loginGoogleButton" onClick={loginUsingGoogleButton}>
        <img className="loginGoogleButtonImg" src={googleLogo} alt="" />
        Sign up with Google
      </button>

      <div className="alert">Please provide valid details {error}.</div>
    </div>
  );
}

export default Login;
