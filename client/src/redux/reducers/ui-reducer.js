import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
} from "../types";

const initialState = {
  loading: false,
  errors: null,
};

const uiReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      console.log("SET_ERRORS");
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      console.log("LOADING_UI");
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    default:
      console.log('state default');
      console.log(state);
      return state;
  }
}

export default uiReducers
