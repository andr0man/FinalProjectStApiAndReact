import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import AuthReducer from "./authReducer";

export const rootReducer = combineReducers({
    user: UserReducer,
    auth: AuthReducer
});