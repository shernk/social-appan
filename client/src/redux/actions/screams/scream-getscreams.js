import { SET_SCREAMS, LOADING_DATA } from "../../types";
import axios from "axios";

const getScreamsAction = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get("/screams")
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

export default getScreamsAction;
