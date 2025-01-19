import axios from "@/utils/axios";
import { iserror } from "./adminActions";

export const partnerAadharApprove = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_STATUS_REQUEST" });
    console.log("Sending partner status:", child);
    const { data } = await axios.post(`/partner/aadharApprove`, child);
    dispatch({ type: "ADD_STATUS_SUCCESS", payload: data });
  } catch (error) {
    let errorMessage = "Failed to add status";
    if (!error.response) {
      errorMessage = "No response received from the server";
    } else if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    dispatch({ type: "ADD_STATUS_FAIL", payload: errorMessage });
    dispatch(iserror(errorMessage));
    console.error("Error adding  status:", error);
  }
};

export const partnerPanApprove = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_STATUS_REQUEST" });
    console.log("Sending partner status:", child);
    const { data } = await axios.post(`/partner/panApprove`, child);
    dispatch({ type: "ADD_STATUS_SUCCESS", payload: data });
  } catch (error) {
    let errorMessage = "Failed to add status";
    if (!error.response) {
      errorMessage = "No response received from the server";
    } else if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    dispatch({ type: "ADD_STATUS_FAIL", payload: errorMessage });
    dispatch(iserror(errorMessage));
    console.error("Error adding  status:", error);
  }
};

export const partnerProfileApprove = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_STATUS_REQUEST" });
    console.log("Sending partner status:", child);
    const { data } = await axios.post(`/partner/profileApprove`, child);
    dispatch({ type: "ADD_STATUS_SUCCESS", payload: data });
  } catch (error) {
    let errorMessage = "Failed to add status";
    if (!error.response) {
      errorMessage = "No response received from the server";
    } else if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    dispatch({ type: "ADD_STATUS_FAIL", payload: errorMessage });
    dispatch(iserror(errorMessage));
    console.error("Error adding  status:", error);
  }
};

export const partnerApprove = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_STATUS_REQUEST" });
    console.log("Sending partner status:", child);
    const { data } = await axios.post(`/partner/partnerApprove`, child);
    dispatch({ type: "ADD_STATUS_SUCCESS", payload: data });
    return data;
  } catch (error) {
    let errorMessage = "Failed to add status";
    if (!error.response) {
      errorMessage = "No response received from the server";
    } else if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    dispatch({ type: "ADD_STATUS_FAIL", payload: errorMessage });
    dispatch(iserror(errorMessage));
    console.error("Error adding  status:", error);
  }
};
