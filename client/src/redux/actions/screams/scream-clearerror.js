import { CLEAR_ERRORS } from "../../types";

const clearErrorsAction = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export default clearErrorsAction;
