import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// reducers
import userReducer from "./reducers/user-reducer";
import dataReducer from "./reducers/data-reducer";
import uiReducer from "./reducers/ui-reducer";

const initialState = {};

const middleWare = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleWare));
const store = createStore(reducers, initialState, enhancer);

export default store;
