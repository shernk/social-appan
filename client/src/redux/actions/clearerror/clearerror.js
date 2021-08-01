import { CLEAR_ERRORS } from "../../types";

const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export default clearErrors;
