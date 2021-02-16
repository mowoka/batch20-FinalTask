import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../Context/globalContext";

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  const [state] = useContext(AppContext);
  const { isLogin, isLoading, user } = state;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? (
          <h1>Loading</h1>
        ) : isLogin && user.role == "ADMIN" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRouteAdmin;
