import axios from "axios";
import URL from "../../../api";
import { LOADING_UI, SET_ERRORS } from "../../types";

const signUpUserAction = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`${URL}/signUp`, newUserData)
    .then((res) => {
      this.setState({
        loading: false,
      });

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
