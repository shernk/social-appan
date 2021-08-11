import axios from "axios";
import { LIKE_SCREAM } from "../../types";

const likeScreamAction = (screamId) => (dispatch) => {
  console.log('likeScreamAction');
  console.log(screamId);
  axios
  .get(`/scream/${screamId}/like`)
  .then((res) => {
      console.log(res)
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default likeScreamAction;
