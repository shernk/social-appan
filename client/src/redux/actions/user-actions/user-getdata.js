import axios from "axios";
import { LOADING_USER, SET_USER } from "../../types";

const getUserDataAction = () => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .get("/user/details")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export default getUserDataAction;
