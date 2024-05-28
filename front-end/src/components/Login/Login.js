import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
let useridresponse= null;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()


  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/auth/Login", {
      email,
      password,
    }).then(response => {
        if(response.data.status) {
            navigate('/')
        }
        useridresponse=response.data.userId
        console.log("this is the id",useridresponse);
    }).catch(err => {
        console.log(err)
    })
  };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Loign</h2>

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
        <p>Don't Have Account? <Link to="/SignUp">Sign Up</Link></p> 
      </form>
    </div>
  );
};

export   {Login,useridresponse};