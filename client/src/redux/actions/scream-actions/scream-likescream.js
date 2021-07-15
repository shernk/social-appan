import axios from "axios";
import { LIKE_SCREAM } from "../../types";

const likeScreamAction = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: [],
      });
    });
};

export default likeScreamAction;
