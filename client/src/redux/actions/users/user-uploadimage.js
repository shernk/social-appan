import { LOADING_USER } from "../../types";
import axios from "axios";
import getUserDataAction from "./user-getuserdetail";

const uploadImageAction = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .post("/:handle/image", formData)
    .then(() => {
      dispatch(getUserDataAction());
    })
    .catch((err) => console.log(err));
};

export default uploadImageAction;
