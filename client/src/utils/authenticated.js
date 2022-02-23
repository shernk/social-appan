import React from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useParams } from "react-router";

// redux-types
import { SET_AUTHENTICATED } from "../redux/types";

// redux-actions
import signOutUserAction from "../redux/actions/users/user-signout";
import getUserDetailsAction from "../redux/actions/users/user-getuserdetail";

// redux
import store from "../redux/stores";

// because proxy only works in development(already have added in package.json)
// added this URL to be actually tell axios is always send request to this URL 
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const useAuthenticated = () => {
  const { handle } = useParams();
  const token = localStorage.FBIdToken;
  if (token) {
    const decodeToken = jwtDecode(token);
    if (decodeToken.exp * 1000 < Date.now()) {
      store.dispatch(signOutUserAction());

      window.location.href = "/signin";
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getUserDetailsAction(handle));
    }
  }

  return JSON.stringify("Token is Brokened");
};

export default useAuthenticated;
