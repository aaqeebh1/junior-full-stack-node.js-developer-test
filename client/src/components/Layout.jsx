import React from "react";
import { NavLink } from "react-router-dom";

const Layout = ({children}) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
          </nav>
          <main>{children}</main>
    </div>
  );
};

export default Layout;
