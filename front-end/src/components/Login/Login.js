import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "./logos.png";
let useridresponse = null;
let usernameresponse = null;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/auth/Login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          localStorage.setItem("token", response.data.token);
          console.log("le token", response.data.token);
          navigate("/");
          usernameresponse = response.data.userName;
          console.log("this is the username", usernameresponse);
        }
        useridresponse = response.data.userId;
        console.log("this is the id", useridresponse);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        if (err.response && err.response.status === 401) {
          toast.error(err.response.data.error);
        } else {
          toast.error("An unexpected error occurred");
        }
      });
  };
  return (
    <div className="sign-up-container">
      <ToastContainer />
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="logo-container">
          <a href="http://localhost:3000/">
            <div className="logo-container">
              <img src={logo} alt="Website Logo" />
            </div>
          </a>
        </div>

        <h2 style={{ fontSize: "24px", color: "#c86700", marginBottom: "20px", textAlign: "center" }}>Login</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <Link to="/forgotPassword">Forgot Password?</Link>
        <p>
          Don't Have Account? <Link to="/SignUp">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export { Login, useridresponse, usernameresponse };
