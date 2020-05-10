import React, { useEffect, useContext, Fragment } from "react";
import netlifyIdentity from "netlify-identity-widget";

import { AppContext } from "./AppContext";

import { SET_IS_ADMIN_LOGGED_IN } from "../utils/const";

export const Identity = ({ children }) => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    netlifyIdentity.init({});

    // console.log("netlifyIdentity.currentUser: ", netlifyIdentity.currentUser());

    if (netlifyIdentity.currentUser()) {
      dispatch({
        type: SET_IS_ADMIN_LOGGED_IN,
        admin: netlifyIdentity.currentUser(),
      });
    }
  }, [dispatch]);

  netlifyIdentity.on("login", (user) => {
    netlifyIdentity.close();
    dispatch({
      type: SET_IS_ADMIN_LOGGED_IN,
      admin: user,
    });
  });

  netlifyIdentity.on("logout", (user) => {
    netlifyIdentity.close();
    dispatch({ type: SET_IS_ADMIN_LOGGED_IN, admin: user });
  });

  return <Fragment>{children}</Fragment>;
};
