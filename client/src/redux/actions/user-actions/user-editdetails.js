import { LOADING_USER } from "../../types";
import axios from "axios";
import {default as getUserDataAction} from "./user-getdata";

const editUserDetailsAction = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserDataAction());
    })
    .catch((err) => console.log(err));
};

export default editUserDetailsAction;
