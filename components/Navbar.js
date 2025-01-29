// import React from 'react'

// const Navbar = () => {
//     return (
//         <div className=' py-5 px-4 h-fit w-full flex justify-between bg-navbarBG'>
//             <div className={`text-white`}>
//                 {/* <Image src={Logo} height={150} width={150} /> */}
//                 <h1>GOEASY</h1>
//             </div>
//             <div className='text-white'>hi admin</div>
//         </div>
//     )
// }

// export default Navbar

"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";

const Navbar = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const dispatch = useDispatch();

  // const { admin } = useSelector((state) => state.adminReducer)
  const { admin, isAuthenticated } = useSelector((state) => state.adminReducer);

  // if (!isAuthenticated) {
  //     return <p>You need to log in to view this page.</p>;
  // }

  const handleAdminClick = () => {
    setShowLogoutPopup(!showLogoutPopup);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logged out successfully");
        setShowLogoutPopup(false);
        localStorage.removeItem("token");
        // cookies.removeItem("token");
        dispatch({ type: "LOGOUT" });
        persistor.purge();

        window.location.href = "/";
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="py-5 px-5 h-fit w-full flex justify-between bg-navbarBG">
      <div className="text-white">
        {/* <Image src={Logo} height={150} width={150} /> */}
        <h1>GOEASY</h1>
      </div>
      <div className="text-white cursor-pointer" onClick={handleAdminClick}>
        {(admin && admin.username) || "None"}
      </div>

      {/* Logout Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>Are you sure you want to log out?</p>
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Logout
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
