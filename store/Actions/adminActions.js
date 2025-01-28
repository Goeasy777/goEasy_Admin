import axios from "@/utils/axios";

export const iserror = (error) => {
  return {
    type: "IS_ERROR",
    payload: error,
  };
};

export const adminsignin = (adminData) => async (dispatch) => {
  try {
    const response = await axios.post("/users/login", adminData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }); 
    console.log(response.data);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data.admin,
    });

    localStorage.setItem("token", response.data.token);
    return response;
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

export const adminsignup = (adminData) => async (dispatch) => {
  try {
    const response = await axios.post("/users/signup", adminData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({
      type: "SIGNUP_SUCCESS",
      payload: response.data.admin,
    });

    localStorage.setItem("token", response.data.token);
    return response;
  } catch (error) {
    dispatch({
      type: "SIGNUP_FAIL",
      payload: error.response?.data?.message || "Signup failed",
    });
  }
};

export const updateAdmin = (admin) => async (dispatch, getState) => {
  try {
    const { _id } = getState().adminReducer.admin;
    const { data } = await axios.post("/update/" + _id, admin);
    dispatch({ type: "UPDATE_ADMIN_SUCCESS", payload: data.data });
  } catch (error) {
    dispatch({ type: "IS_ERROR", payload: error.response.data.message });
  }
};

export const resetPassword = (password) => async (dispatch, getState) => {
  try {
    const { _id } = getState().adminReducer.admin;
    console.log(_id);

    const { data } = await axios.post("/resetpassword/" + _id, password);
    console.log(data);

    // dispatch(asynccurrentemployee());
  } catch (error) {
    // dispatch(iserror(error.response.data.message))
  }
};


export const addcity = (Acity) => async (dispatch) => {
  try {
    const { data } = await axios.post("/users/AddCity", Acity);
    console.log(data);

    return data;
  } catch (error) {
    if (!error.response) {
      dispatch(iserror("No response received from the server"));
    } else {
      dispatch(iserror(error.response.data?.message || "Failed to add city"));
    }
  }
};

export const addbanner = (s) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/users/addBanner`, s);
    dispatch({
      type: "ADD_BANNER_SUCCESS",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log("Error while adding banner:", error);
    dispatch({
      type: "ADD_BANNER_FAILURE",
      payload: error.response?.data || "Something went wrong",
    });
  }
};

export const addcategory = (s) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/users/addCategory`, s);
    console.log("data", data);
    return data;
  } catch (error) {
    // dispatch(searchCityError(error.response?.data?.message || 'City search failed'));  // Handle errors
  }
};

export const addsubcategory = (sub) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_SUBCATEGORY_REQUEST" });

    const { data } = await axios.post(`/users/addSubcategory`, sub);

    dispatch({ type: "ADD_SUBCATEGORY_SUCCESS", payload: data });
    console.log("data", data);
    return data;
  } catch (error) {
    let errorMessage = "Failed to add subcategory";
    if (!error.response) {
      errorMessage = "No response received from the server";
    } else if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    dispatch({ type: "ADD_SUBCATEGORY_FAIL", payload: errorMessage });

    dispatch(iserror(errorMessage));

    console.error("Error adding subcategory:", error);
  }
};

export const addchildcategory = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_CHILDCATEGORY_REQUEST" });

    console.log("Sending child category data:", child);

    const { data } = await axios.post(`/users/addChildCategory`, child);

    dispatch({ type: "ADD_CHILDCATEGORY_SUCCESS", payload: data });
    console.log("data", data);
    return data;
  } catch (error) {
    let errorMessage = "Failed to add child category";

    if (!error.response) {
      errorMessage = "No response received from the server";
    } else if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    dispatch({ type: "ADD_CHILDCATEGORY_FAIL", payload: errorMessage });

    dispatch(iserror(errorMessage));

    console.error("Error adding childcategory:", error);
  }
};

export const addoffersectionR = (ad) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/users/addOfferSectionR`, ad);
    console.log(data);

    dispatch({
      type: "ADD_OFFERSECTION_SUCCESS",
      payload: data,
    });

    return data; // Return the response data for success handling
  } catch (error) {
    const errorPayload = error.response?.data || "Something went wrong";

    console.error("Error while adding offer section:", error);

    dispatch({
      type: "ADD_OFFERSECTION_FAILURE",
      payload: errorPayload,
    });

    throw errorPayload; // Throw error for failure handling
  }
};

export const addnotification = (notificationData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `/users/addNotification`,
      notificationData
    );
    console.log("data ", data);
    dispatch({
      type: "ADD_NOTIFICATION_SUCCESS",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log("Error while adding notification:", error);
    dispatch({
      type: "ADD_NOTIFICATION_FAILURE",
      payload:
        error?.response?.data?.message ||
        "Failed to add notification. Please try again.",
    });
  }
};

export const addcustomnotification = (notificationData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `/users/addCustomNotification`,
      notificationData
    );
    console.log("data ", data);
    dispatch({
      type: "ADD_CUSTOMNOTIFICATION_SUCCESS",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log("Error while adding custom notification:", error);
    dispatch({
      type: "ADD_CUSTOMNOTIFICATION_FAILURE",
      payload:
        error?.response?.data?.message ||
        "Failed to add custom notification. Please try again.",
    });
  }
};

export const addOfferService = (s) => async (dispatch) => {
  try {
    const { data } = await axios.post("/users/addOfferServices", s);
    dispatch({
      type: "ADD_OFFERSERVICES_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log("Error while adding offer service:", error);
    dispatch({
      type: "ADD_OFFERSERVICE_FAILURE",
      payload: error.response?.data || "Something went wrong",
    });
  }
};

export const addTestimonials = (s) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/users/addTestimonials`, s);
    dispatch({
      type: "ADD_TESTINOMIALS_SUCCESS",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log("Error while adding testinomials:", error);
    dispatch({
      type: "ADD_TESTINOMIALS_FAILURE",
      payload: error.response?.data || "Something went wrong",
    });
  }
};

export const addTimeAndSlot = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_TIMEANDSLOT_REQUEST" });
    console.log(child);

    const { data } = await axios.post(`/users/addTime`, child);

    dispatch({ type: "ADD_TIMEANDSLOT_SUCCESS", payload: data });

    console.log("data", data);
    return data;
  } catch (error) {
    let errorMessage = "Failed to add time and slot";

    if (!error.response) {
      errorMessage = "No response received from the server";
    } else if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    dispatch({ type: "ADD_TIMEANDSLOT_FAIL", payload: errorMessage });

    dispatch(iserror(errorMessage));

    console.error("Error adding time and slot:", error);
  }
};

export const addCoupon = (res) => async (dispatch) => {
  try {
    console.log("dhbh", res);
    const data = await axios.post(`/users/addCouponcode`, res);
    console.log("data", data);
    dispatch({
      type: "ADD_CountryCode_SUCCESS",
      payload: data,
    });
    return data;
  } catch (err) {
    console.log(err);
    console.log("Error while adding Country:");
  }
};

export const addourclients = (clients) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_OURCLIENTS_REQUEST" });
    const { data } = await axios.post(`/users/addourHappyClients`, clients);

    dispatch({ type: "ADD_OURCLIENTS_SUCCESS", payload: data });
    return data;
  } catch (error) {
    let errorMessage = "Failed to add OURCLIENTS";
    if (!error.response) {
      errorMessage = "No response received from the server";
    } else if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    dispatch({ type: "ADD_OURCLIENTS_FAIL", payload: errorMessage });

    dispatch(iserror(errorMessage));

    console.error("Error adding ourclients:", error);
  }
};

export const addourpartners = (partner) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_OURPARTNERS_REQUEST" });

    const { data } = await axios.post(`/users/addourTrustedPartners`, partner);

    dispatch({ type: "ADD_OURPARTNERS_SUCCESS", payload: data });
    console.log("data", data);
    return data;
  } catch (error) {
    let errorMessage = "Failed to add OURPARTNERS";
    if (!error.response) {
      errorMessage = "No response received from the server";
    } else if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    dispatch({ type: "ADD_OURPARTNERS_FAIL", payload: errorMessage });

    dispatch(iserror(errorMessage));

    console.error("Error adding ourpartners:", error);
  }
};


// waller handler

export const addPartnerWallethandeler = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_WALLET_REQUEST" });
    console.log("Sending wallet data:", child);
    const { data } = await axios.post(`/Partner/addpartnerwallet`, child);
    dispatch({ type: "ADD_WALLET_SUCCESS", payload: data });
  } catch (error) {
    let errorMessage = "Failed to add wallet";
    if (!error.response) {
      errorMessage = "No response received from the server";
    } else if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    dispatch({ type: "ADD_WALLET_FAIL", payload: errorMessage });
    dispatch(iserror(errorMessage));
    console.error("Error adding  wallet:", error);
  }
};

export const addWallethandeler = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_WALLET_REQUEST" });
    console.log("Sending wallet data:", child);
    const { data } = await axios.post(`/users/addwallet`, child);
    dispatch({ type: "ADD_WALLET_SUCCESS", payload: data });
  } catch (error) {
    let errorMessage = "Failed to add wallet";
    if (!error.response) {
      errorMessage = "No response received from the server";
    } else if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    dispatch({ type: "ADD_WALLET_FAIL", payload: errorMessage });
    dispatch(iserror(errorMessage));
    console.error("Error adding  wallet:", error);
  }
};

// status handler

export const childcategoryStatushandler = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_STATUS_REQUEST" });
    console.log("Sending user status:", child);
    const { data } = await axios.post(
      `/users/handlechildcategoryStatus`,
      child
    );
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

export const couponStatushandler = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_STATUS_REQUEST" });
    console.log("Sending user status:", child);
    const { data } = await axios.post(`/users/handlecouponstatus`, child);
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

export const partnerStatushandler = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_STATUS_REQUEST" });
    console.log("Sending user status:", child);
    const { data } = await axios.post(`/partner/handlepartnerstatus`, child);
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

export const userStatushandler = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_STATUS_REQUEST" });
    console.log("Sending user status:", child);
    const { data } = await axios.post(`/users/handleuserstatus`, child);
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

export const testimonialStatushandler = (child) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_STATUS_REQUEST" });
    console.log("Sending testimonial status:", child);
    const { data } = await axios.post(`/users/handletestimonialstatus`, child);
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
