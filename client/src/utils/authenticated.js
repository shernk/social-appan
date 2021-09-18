import React from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

// redux-types
import { SET_AUTHENTICATED } from "../redux/types";

// redux-actions
import signOutUserAction from "../redux/actions/users/user-signout";
import getUserDataAction from "../redux/actions/users/user-getdata";

// redux
import store from "../redux/stores";

const authenticated = () => {
  const token = localStorage.FBIdToken;
  if (token) {
    const decodeToken = jwtDecode(token);
    if (decodeToken.exp * 1000 < Date.now()) {
      store.dispatch(signOutUserAction());

      window.location.href = "/signin";
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getUserDataAction());
    }
  }

  return JSON.stringify("Token is Brokened");
};

export default authenticated;
