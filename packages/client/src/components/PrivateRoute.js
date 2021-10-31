import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../providers/UserProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useUserContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: rest.path },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
