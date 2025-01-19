"use client";
import React, { useEffect } from "react";
import Sidebar from "../SideBar";
import Wrapper from "./Wrapper";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Parent = ({ children }) => {
  return (
    <Wrapper>
      <div className="h-screen w-full flex overflow-hidden">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full z-40">
          <Navbar />
        </div>

        {/* Sidebar */}
        {/* <div className="w-60 fixed top-16 left-0 h-full z-30 bg-sidebarBG transition-all duration-300">
          <Sidebar />
        </div> */}
        <div className="w-60 fixed top-16 left-0 h-full z-30 bg-sidebarBG transition-all duration-300 hidden sm:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        {/* <div className="xl:ml-52 md:ml-0 sm:ml-0 mt-10 h-full w-full overflow-y-auto py-2 xl:px-16 sm:px-5 transition-all duration-300 bg-mainBG">
          {children}
        </div> */}
        <div
          className="transition-all duration-300 bg-mainBG h-full w-full overflow-y-auto py-2 mt-10 px-5 sm:px-8 md:px-12 xl:px-16 ml-0 sm:ml-0 md:ml-5 lg:ml-52 xl:ml-52"
        >
          {children}
        </div>
      </div>
    </Wrapper>
  );
};

export default Parent;

// 'use client';
// import React, { useContext } from 'react';
// import Sidebar from '../SideBar';
// import Wrapper, { AuthContext } from './Wrapper';
// import Navbar from '../Navbar';
// import Signin from '@/app/admin/signin/page';

// const Parent = ({ children }) => {
//     const { isAuthenticated } = useContext(AuthContext); // Access auth status

//     return (
//         <Wrapper>
//             <div className="h-screen w-full flex overflow-hidden">
//                 {/* If not authenticated, show Signin component */}
//                 {!isAuthenticated ? (
//                     <Signin />
//                 ) : (
//                     <>
//                         {/* Fixed Navbar */}
//                         <div className="fixed top-0 left-0 w-full z-40">
//                             <Navbar />
//                         </div>

//                         {/* Sidebar */}
//                         <div className="w-60 fixed top-16 left-0 h-full z-30 bg-sidebarBG transition-all duration-300">
//                             <Sidebar />
//                         </div>

//                         {/* Main Content Area */}
//                         <div className="ml-52 mt-10 h-full w-full overflow-y-auto py-2 px-16 transition-all duration-300 bg-mainBG">
//                             {children}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </Wrapper>
//     );
// };

// export default Parent;
