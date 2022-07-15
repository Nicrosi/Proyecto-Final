import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { verifyUser } from "../../redux/actions/authorization";

const RouteGuard = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const authChecked = useSelector((state) => state.auth.authChecked);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);

  return (
    <>
      {authChecked ? (
        <Route
          {...rest}
          render={(props) =>
            loggedIn ? <Component {...props} /> : <Redirect to="/login" />
          }
        />
      ) : null}
    </>
  );
};

export default RouteGuard;
