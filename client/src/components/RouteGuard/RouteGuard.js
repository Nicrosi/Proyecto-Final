import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
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
            (loggedIn && !rest.admin) || rest.admin === user.is_admin ? (
              <Component {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      ) : null}
    </>
  );

  // return (
  //   <>
  //     {authChecked ? (
  //       <Route
  //         {...rest}
  //         render={(props) => {
  //           if (loggedIn) {  //esta logueado,si no, al login
  //             if (rest.admin === user.is_admin) {//tu rol va con el tipo de component?, si no,al login
  //               if (props.match.params.userId) {//el url trae params? si no trae, te deja seguir con el component
  //                 if (parseInt(props.match.params.userId) === user.dni) { //el param del dni es igual al tuyo?, si no, al login
  //                   return <Component {...props} />;
  //                 } else {
  //                   return <Redirect to="/login" />;
  //                 }
  //               } else {
  //                 return <Component {...props} />;
  //               }
  //             } else if (rest.admin !== user.is_admin) {
  //               return <Redirect to="/login" />;
  //             }
  //           }
  //           return <Redirect to="/login" />;
  //         }}
  //       />
  //     ) : null}
  //   </>
  // );
};

export default RouteGuard;
