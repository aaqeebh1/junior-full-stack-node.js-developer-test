import React from "react";
import { NavLink } from "react-router-dom";
import "./Layout.css";
import logo from "../assets/Logo.png";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <div className="logo">
            <img src={logo} alt="logo" style={{width: "200px"}} />
          </div>
          <div className="navLinks">
            <div className="navLink">
              <NavLink to="/">Home</NavLink>
            </div>
            <div className="navLink">
              <NavLink to="/register">Register</NavLink>
            </div>
            <div className="navLink">
              <NavLink to="/login">Login</NavLink>
            </div>
          </div>
        </nav>
      </header>
      <main className="mainBody">{children}</main>
      <footer>
        <p>&copy; 2024 AH. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
