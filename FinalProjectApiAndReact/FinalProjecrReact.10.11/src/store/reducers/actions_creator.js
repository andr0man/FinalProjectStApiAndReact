import * as authActions from "./authReducer/actions";
import * as userActions from "./userReducer/actions";
import * as roleActions from "./userReducer/roleActions";
import * as categotyActions from "./toDosReduser/categoryActions";
import * as toDosListActions from "./toDosReduser/toDosListActions";
import * as toDosActions from "./toDosReduser/actions";

const actions = {
    ...authActions,
    ...userActions,
    ...roleActions,
    ...categotyActions,
    ...toDosListActions,
    ...toDosActions
};

export default actions;