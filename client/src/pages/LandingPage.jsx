import axios from "axios";
import React, { useEffect, useState } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const [userData, setUserData] = useState({});
  const url = "http://localhost:3001/api/users/profile";

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        console.error("No token found in session storage");
        return;
      }
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json;",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="landingPage">
      <h1>Welcome</h1>
      <p>
        Welcome to Dream Builder<span>!</span>
      </p>
      <p>
        {userData.firstName} {userData.lastName}
      </p>
    </div>
  );
};

export default LandingPage;
