import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import logo from "./logos.png";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/auth/SignUp", {
      username,
      email,
      password,
    }).then(response => {
        if(response.data.status) {
            navigate('/Login')
        }
    }).catch(err => {
        console.log(err)
    })
  };
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="logo-container">
        <a href="http://localhost:3000/">
          <div className="logo-container">
            <img src={logo} alt="Website Logo" />
          </div>
        </a>
        <h2 style={{ fontSize: "24px", color: "#c86700", marginBottom: "20px", textAlign: "center" }}>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button type="submit">Sign Up</button>
        <p>Have an Account? <Link to="/Login">Login</Link></p> 
      </div>
      </form>
    </div>
    
  );
};

export default Signup;
