import * as authActions from "./authReducer/actions";
import * as userActions from "./userReducer/actions";
import * as roleActions from "./userReducer/roleActions";
import * as categotyActions from "./toDosReduser/categoryActions";

const actions = {
    ...authActions,
    ...userActions,
    ...roleActions,
    ...categotyActions
};

export default actions;