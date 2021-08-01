import { LOADING_USER, SET_SCREAMS } from "../../types";
import axios from "axios";

const getUserDataHandleAction = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  console.log('user data handle');
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      console.log("res.data");
      console.log(res.data);
      console.log("res.data.screams");
      console.log(res.data.screams);
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
