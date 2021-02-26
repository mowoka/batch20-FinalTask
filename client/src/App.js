import React, { useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AppContext } from "./Context/globalContext";
import { setAuthToken } from "./config/api";
import { API } from "./config/api";
import Landing from "./Pages/Landing/Landing";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import DetailBookPage from "./Pages/DetailBook/DetailBookPage";
import PrivateRouteUser from "./Components/PrivateRouteUser";
import PrivateRouteAdmin from "./Components/PrivateRouteAdmin";
import Transaction from "./Pages/Transaction/Transaction";
import AddBook from "./Pages/AddBook/AddBook";
import Checkout from "./Pages/Checkout/Checkout";
import DownloadBook from "./Pages/DownloadBook/DownloadBook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(AppContext);
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      } else {
        dispatch({
          type: "USER_LOADED",
          payload: response.data.data.user,
        });
      }
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
        <Switch>
          <Route path="/" exact component={Landing} />
          <PrivateRouteUser path="/home" component={Home} />
          <PrivateRouteUser path="/profile" exact component={Profile} />
          <PrivateRouteUser path="/book-page/:id" component={DetailBookPage} />
          <PrivateRouteUser path="/checkout" exact component={Checkout} />
          <PrivateRouteUser
            path="/download-book/:id"
            exact
            component={DownloadBook}
          />
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
