import { LOADING_USER } from "../../types";
import axios from "axios";
import getUserDataAction  from "../../actions/user-actions/user-getdata";

const uploadImageAction = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserDataAction());
    })
    .catch((err) => console.log(err));
};

export default uploadImageAction;
