import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="container">
          <p>
            <span>'</span>Welcome to <span>Dream Builder!</span> We offer a wide range of
            products and service to help build your dreams. To unlock the full
            potential of our platform,{" "}
            <NavLink to="/register">create a free account </NavLink> or{" "}
            <NavLink to="/login">login</NavLink> if you already have one.<span>'</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
