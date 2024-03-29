import { combineReducers } from "redux";

import authReducer from "../reducers/slices/authReducers";

export default function createRootReducer() {
  return combineReducers({
    auth: authReducer,
  });
}