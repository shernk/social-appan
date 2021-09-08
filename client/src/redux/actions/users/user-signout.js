import { SET_UNAUTHENTICATED } from "../../types";
import axios from "axios";

const signOutUserAction = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export default signOutUserAction
