import * as authActions from "./authReducer/actions";
import * as userActions from "./userReducer/actions";
import * as roleActions from "./userReducer/roleActions";

const actions = {
    ...authActions,
    ...userActions,
    ...roleActions
};

export default actions;