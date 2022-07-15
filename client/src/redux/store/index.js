import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "../reducer";
import auth from "../reducer/authorization";

const store = createStore(
  combineReducers({ rootReducer, auth }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
