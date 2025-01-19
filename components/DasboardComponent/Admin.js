"use client";
import React, { useState } from "react";
import { AiTwotoneProfile } from "react-icons/ai";
import { MdCategory, MdOutlineCategory } from "react-icons/md";
import {
  RiUserFill,
  RiUserLine,
  RiUserStarFill,
  RiUserStarLine,
  RiUserUnfollowFill,
} from "react-icons/ri";

function Admin() {
  const [active, setActive] = useState("0");
  const [deactive, setDeactive] = useState("0");
  const [total, setTotal] = useState("0");

  return (
    <div>
      <div className="bg-dashboardBoxBG h-36 w-full px-2 py-4 rounded-lg shadow-md flex flex-col gap-2">
        <div className="flex items-center">
          <h2 className="text-base text-textBlack font-bold ml-3">
            Admin status
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="w-full flex items-center justify-center">
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              <RiUserStarFill size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack ">
              <h3 className="text-sm  font-semibold">Active</h3>
              <p className=" text-base ">{active}</p>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <div className="bg-red-100 text-red-600 p-2 rounded-full">
              <RiUserUnfollowFill size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack ">
              <h3 className="text-sm  font-semibold">Deactive</h3>
              <p className=" text-base ">{deactive}</p>
            </div>
          </div>

          {/* <div className="w-full flex items-center">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <RiUserFill size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack ">
              <h3 className="text-sm  font-semibold">Total</h3>
              <p className=" text-base ">{total}</p>
            </div>
          </div> */}
        </div>

        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold ml-3">Total :- </h2>
          <h1 className="text-base">{total || "0"}</h1>
        </div>
      </div>
    </div>
  );
}

export default Admin;
