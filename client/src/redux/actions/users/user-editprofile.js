import { LOADING_USER } from "../../types";
import axios from "axios";
import getUserDataAction from "./user-getuserdetail";

const editProfileAction = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .post("/:handle/profile", userDetails)
    .then(() => {
      dispatch(getUserDataAction());
    })
    .catch((err) => console.log(err));
};

export default editProfileAction;
