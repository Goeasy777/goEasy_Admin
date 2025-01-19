// rootReducer.js
import { combineReducers } from "redux";
import adminReducer from "./Reducers/adminReducer";
// import adminReducer from './adminReducer';
// Import other reducers if you have them

const rootReducer = combineReducers({
  adminReducer, // Combines admin reducer
  // Add other reducers here
});

export default rootReducer;
