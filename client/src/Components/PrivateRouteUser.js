import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../Context/globalContext";
import Loading from "./Loading/Loading";

const PrivateRouteUser = ({ component: Component, ...rest }) => {
  const [state] = useContext(AppContext);
  const { isLogin, isLoading, user } = state;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? (
          <Loading />
        ) : isLogin && user.role == "User" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRouteUser;
