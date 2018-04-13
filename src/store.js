import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import authReducer from "./ducks/authReducer";
import locationReducer from "./ducks/locationReducer";

export default createStore(
  combineReducers({ authReducer, locationReducer }),
  applyMiddleware(promiseMiddleware())
);
