import http from "../../../http_common";
import { toast } from "react-toastify";

export const loadUsers = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.get("user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const { data } = response;
    const users = data.payload;
    dispatch({ type: "LOAD_USERS", payload: users });
  } catch (error) {
    console.log("Users error", error);
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.put("user", user, {
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

export const deleteUser = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }
    const response = await http.delete("user?id=" + id, {
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

    dispatch({ type: "DELETE_USER", payload: id });

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
