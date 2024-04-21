import { combineReducers } from "redux"

import authReducer from "../reducers/slices/authReducers"
// Add reducers to the root reducer
export default function createRootReducer() {
    return combineReducers({
        auth: authReducer,
    })
}
