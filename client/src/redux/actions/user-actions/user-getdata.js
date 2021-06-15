import axios from "axios";
import URL from "../../../api";
import { SET_USER } from "../../types";

const getUserDataAction = () => (dispatch) => {
  axios
    .get(`${URL}/user/details`)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export default getUserDataAction;
