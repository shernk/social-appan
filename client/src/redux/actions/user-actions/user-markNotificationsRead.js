import axios from "axios";
import { MARK_NOTIFICATIONS_READ } from "../../types";

const markNotificationsRead = (notificationId) => (dispatch) => {
  axios
    .post("/notifications", notificationId)
    .then((res) => {
      dispatch({ type: MARK_NOTIFICATIONS_READ });
    })
    .catch((err) => console.log(err));
};

export default markNotificationsRead;
