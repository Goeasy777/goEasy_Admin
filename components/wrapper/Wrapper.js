"use client";
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { store } from '@/store/store'
// import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Wrapper = ({ children }) => {
//   const router = useRouter();
//   const { isAuthenticated } = useSelector((state) => state.adminReducer);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/"); // Redirect if not authenticated
//     }
//   }, [isAuthenticated, router]);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
        {/* <ToastContainer /> */}
      </Provider>
    </>
  );
};

export default Wrapper;

// 'use client'
// import React, { createContext, useState } from 'react';
// import { Provider as ReduxProvider } from 'react-redux';
// import { store } from '@/store/store';
// import SideBar from '../SideBar';

// export const AuthContext = createContext();

// const Wrapper = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const login = () => setIsAuthenticated(true);
//     const logout = () => setIsAuthenticated(false);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             <ReduxProvider store={store}>
//                 {/* Conditionally render SideBar if authenticated */}
//                 {isAuthenticated && <SideBar />}
//                 {children}
//                 {/* Uncomment ToastContainer if needed for notifications */}
//                 {/* <ToastContainer /> */}
//             </ReduxProvider>
//         </AuthContext.Provider>
//     );
// };

// export default Wrapper;
