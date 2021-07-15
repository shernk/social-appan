import axios from "axios";
import { UNLIKE_SCREAM } from "../../types";

const unlikeScreamAction = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: [],
      });
    });
};

export default unlikeScreamAction;
