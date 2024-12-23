import { toast } from "react-toastify";
import http from "../../../http_common";

export const loadToDos = (toDosListId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.get(`ToDo?toDoListId=${toDosListId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;

    dispatch({
      type: "LOAD_TODOS",
      payload: data.payload,
    });
  } catch (error) {
    toast.error(error.message);
  }
};

export const createToDo = (newToDo) => async (dispatch) => {
  try {
    console.log(newToDo);

    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.post("ToDo", newToDo, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;

    if (data === undefined) {
      const responseData = response.response.data;
      if (responseData.statusCode != 200) {
        return { success: false, message: responseData.message };
      }
    }

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const toggleToDo = (toDoid) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.put(`ToDo/Toggle/${toDoid}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;

    console.log(data);

    if (data === undefined) {
      const responseData = response.response.data;
      if (responseData.statusCode != 200) {
        return { success: false, message: responseData.message };
      }
    }

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const updateToDo = (toDo) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.put("ToDo", toDo, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;

    if (data === undefined) {
      const responseData = response.response.data;
      if (responseData.statusCode != 200) {
        return { success: false, message: responseData.message };
      }
    }

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const deleteToDo = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.delete(`ToDo/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const { data } = response;

    if (data === undefined) {
      const responseData = response.response.data;
      if (responseData.statusCode != 200) {
        return { success: false, message: responseData.message };
      }
    }

    dispatch({ type: "DELETE_TODOS", payload: id });

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
