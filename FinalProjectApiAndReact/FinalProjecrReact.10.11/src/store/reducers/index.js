import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import AuthReducer from "./authReducer";
import ToDosReducer from "./toDosReduser";

export const rootReducer = combineReducers({
    user: UserReducer,
    auth: AuthReducer,
    toDos: ToDosReducer
});