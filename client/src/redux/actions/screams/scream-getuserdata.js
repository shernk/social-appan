import { LOADING_DATA, SET_SCREAMS } from "../../types";
import axios from "axios";

const getUserDataAction = (handle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get(`/${handle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null,
      });
    });
};

export default getUserDataAction;
