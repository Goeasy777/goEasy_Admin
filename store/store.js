// import { configureStore } from "@reduxjs/toolkit";
// import adminReducer from "./Reducers/adminReducer";

// export const store = configureStore({
//     reducer: {
//         adminReducer,
//     },
// })

// import { configureStore } from '@reduxjs/toolkit';
// // import adminReducer from './reducers/adminReducer';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage
// import adminReducer from './Reducers/adminReducer';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['adminReducer'], // Only persist adminReducer
// };

// const persistedReducer = persistReducer(persistConfig, adminReducer);

// const store = configureStore({
//     reducer: {
//         adminReducer: persistedReducer,
//     },
// });

// export const persistor = persistStore(store);
// export default store;

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default to localStorage for web
// import rootReducer from './Reducers'; // import your root reducer
import { thunk } from 'redux-thunk';
import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['adminReducer'], // Only persist the adminReducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
