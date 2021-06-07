import { LOADING_UI } from "../../types";
import axios from "axios";
import URL from "../../../api";

const signInUserAction = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`${URL}/signIn`, userData)
    .then((res) => {
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem("FBIdToken", FBIdToken);
      this.setState({
        loading: false,
      });

      history.push("/");
    })
    .catch((err) => {
      this.setState({
        errors: err.response.data,
        loading: false,
      });
    });
};

export default signInUserAction;
