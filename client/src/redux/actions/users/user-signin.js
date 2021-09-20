import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS } from "../../types";
import axios from "axios";
import setAuthorizationHeader from "./authorization-header/authorization-header";
import getUserDetailsAction from "../users/user-getuserdetail";

const signInUserAction = (userData, handle, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/signin", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserDetailsAction(handle));
      dispatch({ type: CLEAR_ERRORS });

      history.push("/home");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export default signInUserAction;
