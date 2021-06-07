import jwtDecode from "jwt-decode";
import { SET_AUTHENTICATED } from "../redux/types";
import {signOutUserAction} from "../redux/actions/user-actions/user-signout";
import getUserDataAction from '../redux/actions/user-actions/user-getdata'

const authenticated = () => {
  let authenticate;
  const token = localStorage.FBIdToken;
  if (token) {
    const decodeToken = jwtDecode(token);
    if (decodeToken.exp * 1000 < Date.now()) {
      window.location.href = "/login";
      authenticate = false;
    } else {
      authenticate = true;
    }
  }

  return JSON.stringify("Token is Brokened");
};

export default authenticated;
