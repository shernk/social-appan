import axios from "axios";
import { LOADING_UI, SET_ERRORS } from "../../types";

const signUpUserAction = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`/signUp`, newUserData)
    .then((res) => {

      history.push("/signIn");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export default signUpUserAction;
