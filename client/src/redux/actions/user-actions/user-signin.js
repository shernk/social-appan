import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS } from "../../types";
import axios from "axios";
import URL from "../../../api";
import setAuthorizationHeader from "./authorization-header/authorization-header";
import GetUserDataAction from "./user-getdata";

const signInUserAction = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`${URL}/signIn`, userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(GetUserDataAction());
      dispatch({ type: CLEAR_ERRORS });

      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export default signInUserAction;
