import axios from "axios";
import { LOADING_UI, POST_SCREAM, SET_ERRORS } from "../../types";

// redux
import clearErrorsAction from "./scream-clearerror";

const postScreamAction = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/scream", newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });

      dispatch(clearErrorsAction());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export default postScreamAction;
