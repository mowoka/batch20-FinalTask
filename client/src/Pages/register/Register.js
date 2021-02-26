import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { API, setAuthToken } from "../../config/api";
import { AppContext } from "../../Context/globalContext";
import { useHistory } from "react-router-dom";
import "./register.css";

const Register = ({ handleLinkDaftar, showDaftar, handleCloseDaftar }) => {
  const [message, setMessage] = useState("");

  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const history = useHistory();

  const [state, dispatch] = useContext(AppContext);
  const { email, password, fullName } = registerFormData;

  const onChangeRegister = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitDaftar = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({
        email,
        password,
        fullName,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const post = await API.post("/register", body, config);

      const response = post.data.message;
      setMessage(response);

      if (post.data.status === "Success") {
        // dispatch({
        //   type: "REGISTER_SUCCESS",
        //   payload: post.data.data.user,
        // });
        setMessage(post.data.message);

        login();
      }

      console.log(post.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const body = JSON.stringify({
        email,
        password,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const post = await API.post("/login", body, config);

      setMessage(post.data.message);

      if (post.data.status == "Success") {
        setAuthToken(post.data.data.user.token);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: post.data.data.user,
        });
        if (post.data.data.user.role == "ADMIN") {
          history.push("/transactions");
        } else {
          history.push("/home");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="md" show={showDaftar} onHide={handleCloseDaftar} centered>
      <Modal.Body>
        <div className="daftar-container">
          <p>Sign Up</p>
          {message ? (
            <div
              className={
                message == "Email Already Register"
                  ? "daftar-message bg-waring"
                  : message == "Register Success"
                  ? "daftar-message bg-success"
                  : "daftar-message bg-error"
              }
            >
              {message}
            </div>
          ) : (
            <div className="daftar-message"></div>
          )}

          <div className="form--container">
            <form onSubmit={onSubmitDaftar}>
              <input
                style={{
                  width: "420px",
                  height: "45px",
                  fontSize: "17px",
                }}
                type="email"
                className="form-control background--gray"
                placeholder="Email"
                name="email"
                onChange={(e) => onChangeRegister(e)}
              />
              <input
                style={{
                  marginTop: "30px",
                  width: "420px",
                  height: "45px",
                  fontSize: "17px",
                }}
                type="password"
                className="form-control background--gray"
                placeholder="password"
                name="password"
                onChange={(e) => onChangeRegister(e)}
              />
              <input
                style={{
                  marginTop: "30px",
                  width: "420px",
                  height: "45px",
                  fontSize: "17px",
                }}
                type="text"
                className="form-control background--gray"
                placeholder="Full Name"
                name="fullName"
                onChange={(e) => onChangeRegister(e)}
              />
              <input type="submit" className="btn form-btn " value="Sign Up" />
            </form>
            <p className="end-text">
              Already have an account ? Klik
              <span onClick={handleLinkDaftar}> Here</span>
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
