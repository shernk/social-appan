import { LOADING_DATA, SET_SCREAMS } from "../../types";
import axios from "axios";

const getUserDataHandleAction = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

export default getUserDataHandleAction;
