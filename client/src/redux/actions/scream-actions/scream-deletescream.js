import { DELETE_SCREAM } from "../../types";
import axios from "axios";

const deleteScreamsAction = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: DELETE_SCREAM,
        payload: [],
      });
    });
};

export default deleteScreamsAction;
