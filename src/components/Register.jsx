import { useState } from "react";

//import css
import "../styles/login.css";

//fire base providers
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const[error, setError] = useState("");

  const registerSubmit = (event) => {
    if (userName.length === 0 || email.length === 0 || password.length === 0) {
      document.querySelector(".alert").style.display = "block";
      setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
      }, 3000);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          document.querySelector(".success").style.display = "block";
          setTimeout(() => {
            document.querySelector(".success").style.display = "none";
          }, 3000);
        })
        .catch((error) => {
          let err = error.message;
          err = err.split('/')[1].replace(')', '.') 
          setError(err)
          document.querySelector(".alert").style.display = "block";
          setTimeout(() => {
            document.querySelector(".alert").style.display = "none";
          }, 3000);
        });
    }

    event.preventDefault();
  };

  return (
    <div className="loginPage">
      <h1 className="loginHeading">Sign in</h1>

      <form className="loginForm">
        <input
          type="text"
          name="userName"
          id="userName"
          value={userName}
          placeholder="User name"
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="******"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={registerSubmit} className="loginFormButton">
          Continue
        </button>
      </form>

      <div className="alert">Please provide valid details {error}. </div>
      <div className="success">Successfully registered</div>
    </div>
  );
}

export default Register;
