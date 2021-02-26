import React, { useContext, useState } from "react";
import "./Navbar.css";
import Login from "../../Pages/login/Login";
import Register from "../../Pages/register/Register";

const Navbar = () => {
  const [showDaftar, setShowDaftar] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseDaftar = () => setShowDaftar(false);
  const handleShowDaftar = () => setShowDaftar(true);
  const handleLinkDaftar = () => {
    setShowDaftar(false);
    setShowLogin(true);
  };
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleLinkLogin = () => {
    setShowLogin(false);
    setShowDaftar(true);
  };

  return (
    <>
      <div className="navbar--container">
        <div className="navbar--menu-logo">
          <img src="image/logo.png" alt="logo" />
        </div>
        <div className="navbar--menu-button">
          <div className="navabar--btn-login">
            <button onClick={() => handleShowLogin()} className="btn">
              Login
            </button>
          </div>
          {showLogin ? (
            <Login
              handleLinkLogin={handleLinkLogin}
              showLogin={showLogin}
              handleCloseLogin={handleCloseLogin}
            />
          ) : null}
          <div className="navabar--btn-register">
            <button onClick={() => handleShowDaftar()} className="btn">
              Register
            </button>
          </div>
          {showDaftar ? (
            <Register
              handleLinkDaftar={handleLinkDaftar}
              showDaftar={showDaftar}
              handleCloseDaftar={handleCloseDaftar}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Navbar;
