import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Alert, Button } from "@mui/material";
import undraw_website from "../assets/undraw_website.svg";
import "./Login.css";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loginSuccess, setLoginSuccess] = useState(null);
  const navigate = useNavigate();

  const url = "http://localhost:3001/api/users/login";

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, login);
      if (response.data.message === "Login successful") {
        setLoginSuccess(true);
        sessionStorage.setItem("authToken", response.data.token);
        navigate("/landing");
      }
    } catch (error) {
      console.log(error);
      setLoginSuccess(false);
    }
  };

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <div className="loginContainer">
        <div className="login-image">
          <img src={undraw_website} alt="website" className="loginImg" />
        </div>
        <div className="form login-form">
          <form onSubmit={loginSubmit}>
            <h3>Login</h3>
            <div className="form-group">
              <TextField
                type="email"
                id="email"
                placeholder="Enter Email"
                value={login.email}
                label="Email"
                variant="outlined"
                size="small"
                margin="normal"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <TextField
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={login.password}
                label="Password"
                variant="outlined"
                size="small"
                margin="normal"
                onChange={handleChange}
                color={loginSuccess === false ? "error" : "primary"}
              />
            </div>
            {loginSuccess === false && (
              <Alert severity="error" className="error-alert">
                Invalid email or password
              </Alert>
            )}
            <Button type="submit" variant="outlined" className="submit-btn">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
