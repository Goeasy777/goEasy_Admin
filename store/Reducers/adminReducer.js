const initialState = {
  admin: null,
  isAuthenticated: false,
  errors: null,
  token: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: true,
        errors: null,
      };

    case "SIGNUP_FAIL":
      return {
        ...state,
        admin: null,
        isAuthenticated: false,
        errors: action.payload,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: true,
        errors: null,
        // token: token,
      };

    case "LOGIN_FAIL":
      return {
        ...state,
        admin: null,
        isAuthenticated: false,
        errors: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        admin: null,
        // user: null,
        token: null,
        isAuthenticated: false,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: null,
      };

    case "IS_ERROR":
      // Add the new error to errors array
      return {
        ...state,
        errors: state.errors
          ? [...state.errors, action.payload]
          : [action.payload],
      };

    case "UPDATE_ADMIN_SUCCESS":
      return {
        ...state,
        admin: action.payload,
      };

    default:
      return state;
  }
};

export default adminReducer;
