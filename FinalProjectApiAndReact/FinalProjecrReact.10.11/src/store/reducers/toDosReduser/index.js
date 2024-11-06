const initState = {
    categories: []
}

const ToDosReducer = (state = initState, action) => {
    switch(action.type) {
        case "LOAD_CATEGORIES":
            return { ...state, categories: action.payload };
        case "DELETE_CATEGORY":
            return { ...state, categories: state.categories.filter(c => c.id != action.payload) };
        default: return state;
    }
}

export default ToDosReducer;
