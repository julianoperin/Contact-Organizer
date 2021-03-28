import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

import logo from "./logo-agendaa.png";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <>
      <li> Hello, {user && user.name}!</li>{" "}
      <li>
        <a onClick={onLogout} href="#">
          <i className="fas fa-sign-out-alt"> </i>{" "}
          <span className="hide-sm"> Logout </span>{" "}
        </a>{" "}
      </li>{" "}
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/register"> Register </Link>{" "}
      </li>{" "}
      <li>
        <Link to="/login"> Login </Link>{" "}
      </li>{" "}
    </>
  );

  return (
    <div className="navbar bg-primary">
      <h6>
        <img src={logo} alt="logo" />
      </h6>{" "}
      <ul> {isAuthenticated ? authLinks : guestLinks} </ul>{" "}
    </div>
  );
};

export default Navbar;
