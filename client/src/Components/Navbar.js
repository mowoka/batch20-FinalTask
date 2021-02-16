import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/globalContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [showDropDownProfile, setShowDropDownProfile] = useState(false);
  const [state, dispatch] = useContext(AppContext);
  const linkImageDefault = state.user.avatar;
  const handleShowDropDownProfile = () =>
    setShowDropDownProfile(!showDropDownProfile);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {});

  return (
    <div>
      <div className="transaction--menu-header">
        <div className="header--menu-logo">
          <img src="image/beranda/wow-icon.png" alt="wow-logo" />
        </div>
        <div className="header--menu-profile">
          {state.carts.length}
          <img
            style={{
              display: "inline-block",
              position: "relative",
              borderRadius: "50%",
            }}
            src="image/cart.png"
            alt="admin-avatar"
          />

          <div class="dropdown">
            <img
              style={{
                display: "inline-block",
                position: "relative",
                borderRadius: "50%",
              }}
              className="dropbtn"
              src="image/avatar.png"
              alt="admin-avatar"
              onClick={handleShowDropDownProfile}
            />
            <div class="dropdown-content">
              <Link to="/profile">Profile</Link>
              <a onClick={handleLogout} href="/">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
