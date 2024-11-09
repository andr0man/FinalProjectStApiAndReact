import { toast } from "react-toastify";
import http from "../../../http_common";

export const loadToDosList = (userId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.get(`ToDosList?userId=${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;

    dispatch({
      type: "LOAD_TODOLIST",
      payload: data.payload,
    });
  } catch (error) {
    toast.error(error.message);
  }
};

export const loadOneToDosList = (toDosListId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.get(`ToDosList/${toDosListId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;

    dispatch({
      type: "LOAD_ONETODOLIST",
      payload: data.payload,
    });
  } catch (error) {
    toast.error(error.message);
  }
};

export const createToDosList = (newToDosList) => async (dispatch) => {
  try {
    console.log(newToDosList);

    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.post("ToDosList", newToDosList, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;

    if (data === undefined) {
      const responseData = response.response.data;
      if (responseData.statusCode !== 200) {
        return { success: false, message: responseData.message };
      }
    }

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const updateToDosList = (toDoList) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.put("ToDosList", toDoList, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;

    if (data === undefined) {
      const responseData = response.response.data;
      if (responseData.statusCode !== 200) {
        return { success: false, message: responseData.message };
      }
    }

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const deleteToDosList = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.delete(`ToDosList/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const { data } = response;

    if (data === undefined) {
      const responseData = response.response.data;
      if (responseData.statusCode !== 200) {
        return { success: false, message: responseData.message };
      }
    }

    dispatch({ type: "DELETE_TODOLIST", payload: id });

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
