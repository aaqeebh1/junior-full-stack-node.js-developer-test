import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleConfrimPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const url = "http://localhost:3001/api/users/register";

  const registerUser = (e) => {
    e.preventDefault();
    if (confirmPassword !== formData.password) {
      setPasswordMatch(false);
      return;
    } else if (confirmPassword === formData.password) {
      setPasswordMatch(true);
      try {
        axios
          .post(url, formData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
    console.log("Registering User:", formData);
  };

  return (
    <>
      <div className="form register-form">
        <h3>Register</h3>
        <form onSubmit={registerUser}>
          <div>
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="name">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfrimPassword}
            />
            {!passwordMatch && <p>Passwords do not match</p>}
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
