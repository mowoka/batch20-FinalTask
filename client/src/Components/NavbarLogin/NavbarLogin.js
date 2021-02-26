import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/globalContext";
import { Link } from "react-router-dom";
import "./NavbarLogin.css";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "../../asssets/avatar.png";
import cart from "../../asssets/cart.png";
import logo from "../../asssets/logo.png";

const NavbarLogin = () => {
  const [showDropDownProfile, setShowDropDownProfile] = useState(false);
  const [state, dispatch] = useContext(AppContext);
  const linkImageDefault = state.user.avatar;
  const handleShowDropDownProfile = () =>
    setShowDropDownProfile(!showDropDownProfile);
  const { user } = state;
  const linkImg = `http://localhost:5000/uploads/${user.avatar}`;

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {});

  return (
    // ini navbar login
    <>
      <div className="navLogin--menu-header">
        <div className="navLog--menu-logo">
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="header--navlog-profile">
          <div className="--menu--carts">
            <Link to="/checkout">
              <img className="image-cart" src={cart} alt="cart" />
            </Link>
            <p className={state.carts.length > 0 ? "--text-bg-red" : null}>
              {state.carts.length > 0 ? state.carts.length : null}
            </p>
          </div>
          <div class="dropdown">
            <img src={linkImg ? linkImg : Avatar} alt="avatar" />
            <div class="dropdown-content">
              <div className="navLog--profile">
                <Link to="/profile">
                  <PersonOutlineIcon />
                  <p>Profile</p>
                </Link>
              </div>
              <div onClick={() => handleLogout()} className="navLog--Logout">
                <ExitToAppIcon style={{ color: "red" }} />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarLogin;
