import { toast } from "react-toastify";
import http from "../../../http_common";

export const loadCategories = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.get("category", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { data } = response;

    dispatch({
      type: "LOAD_CATEGORIES",
      payload: data.payload,
    });
  } catch (error) {
    toast.error(error.message);
  }
};

export const createCategory = (newCategory) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.post("category", newCategory, {
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

export const updateCategory = (category) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.put(`category/${category.id}`, category, {
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

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.delete(`category/${id}`, {
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

    dispatch({ type: "DELETE_CATEGORY", payload: id });

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
