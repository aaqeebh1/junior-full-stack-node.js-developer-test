import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../assets/Loading.svg";
import undraw_users from "../assets/undraw_users.svg";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [successfulRegister, setSuccessfulRegister] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const url = "http://localhost:3001/api/users/register";
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    if (confirmPassword !== formData.password) {
      setPasswordMatch(false);
      return;
    } else if (confirmPassword === formData.password) {
      setPasswordMatch(true);
      try {
        await axios.post(url, formData);
        setSuccessfulRegister(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setUserExists(true);
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      if (!isValidEmail) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
    if (e.target.id === "password") {
      const isValidPassword =
        /^(?=.*\d)(?=.*[!@#$%^&*._-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
          e.target.value
        );
      if (!isValidPassword) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
    setFormData({
      ...formData,
      [e.target.id]:
        e.target.id === "email" ? e.target.value.toLowerCase() : e.target.value,
    });
  };

  const handleConfrimPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      {successfulRegister ? (
        <div className="redirectionContainer">
          <p>
            <span>"</span>Registration successful<span>!"</span>
          </p>
          <p>You will now be redirected to the login page...</p>
          <img
            src={Loading}
            alt="loading"
            className="loadingImage"
            height={100}
            width={100}
          />
        </div>
      ) : (
          <div className="registerContainer">
            <img src={undraw_users} alt="" className="registerImg"/>
          <div className="form register-form">
            <form onSubmit={registerUser}>
              <h3>Register</h3>
              <div>
                <TextField
                  type="text"
                  id="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  label="First Name"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  type="text"
                  id="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  label="Email"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  onChange={handleChange}
                  color={emailError === true ? "error" : "primary"}
                  helperText={emailError && "Invalid email"}
                />
              </div>
              <div>
                <TextField
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  label="Password"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  onChange={handleChange}
                  color={passwordError === true ? "error" : "primary"}
                  helperText={
                    passwordError && (
                      <span style={{ fontSize: "12px" }}>
                        Password must contain at least:
                        <br />
                        8 characters,
                        <br />
                        one uppercase,
                        <br />
                        one lowercase,
                        <br />
                        one number,
                        <br />
                        one special character
                      </span>
                    )
                  }
                />
              </div>
              <div>
                <TextField
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  label="Confirm Password"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  onChange={handleConfrimPassword}
                  helperText={!passwordMatch && "Passwords do not match"}
                />
              </div>
              {userExists && (
                <Alert severity="error">User already exists</Alert>
              )}
              <Button
                type="submit"
                variant="outlined"
                className="submit-btn"
                disabled={passwordError || emailError ? true : false}
              >
                Register
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
