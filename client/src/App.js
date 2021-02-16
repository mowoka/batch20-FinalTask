import React, { useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AppContext } from "./Context/globalContext";
import { setAuthToken } from "./config/api";
import { API } from "./config/api";
import Landing from "./Pages/Landing/Landing";
import Profile from "./Pages/Profile/Profile";
import DetailBook from "./Pages/DetailBook/DetailBook";
import Navbar from "./Components/Navbar/Navbar";
import NavbarLogin from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";
import PrivateRouteAdmin from "./Components/PrivateRouteAdmin";
import Transaction from "./Pages/Transaction/Transaction";
import AddBook from "./Pages/AddBook/AddBook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// function App() {
//   const [state, dispatch] = useContext(AppContext);

function App() {
  const [state, dispatch] = useContext(AppContext);
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      dispatch({
        type: "USER_LOADED",
        payload: response.data.data.user,
      });
    } catch (error) {
      return dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Router>
        {state.isLogin && state.user.role == "User" ? (
          <NavbarLogin />
        ) : !state.isLogin ? (
          <Navbar />
        ) : null}
        <Switch>
          <Route path="/" exact component={Landing} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/detail-book/:id" exact component={DetailBook} />
          <PrivateRoute path="/checkout" exact component={Transaction} />
          <PrivateRouteAdmin
            path="/transactions"
            exact
            component={Transaction}
          />
          <PrivateRouteAdmin path="/add-book" exact component={AddBook} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
