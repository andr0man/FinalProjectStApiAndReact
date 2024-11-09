const initState = {
  categories: [],
  toDosList: [],
  toDos: [],
  oneToDoList: null
};

const ToDosReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_CATEGORIES":
      return { ...state, categories: action.payload };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id != action.payload),
      };
    case "LOAD_TODOLIST":
      return { ...state, toDosList: action.payload };
    case "DELETE_TODOLIST":
      return {
        ...state,
        toDosList: state.toDosList.filter((c) => c.id != action.payload),
      };
    case "LOAD_TODOS":
      return { ...state, toDos: action.payload };
    case "LOAD_ONETODOLIST":
      return { ...state, oneToDoList: action.payload };
    case "DELETE_TODOS":
      return {
        ...state,
        toDos: state.toDos.filter((c) => c.id != action.payload),
      };
    default:
      return state;
  }
};

export default ToDosReducer;
