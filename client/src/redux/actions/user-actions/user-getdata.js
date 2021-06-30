import axios from "axios";
import { SET_USER } from "../../types";

const getUserDataAction = () => (dispatch) => {
  axios
    .get(`/user/details`)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export default getUserDataAction;
