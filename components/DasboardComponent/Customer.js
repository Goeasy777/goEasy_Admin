"use client";
import React, { useEffect, useState } from "react";
import { AiTwotoneProfile } from "react-icons/ai";
import { MdCategory, MdOutlineCategory } from "react-icons/md";
import { FiUserCheck, FiUsers, FiUserX } from "react-icons/fi";
import Link from "next/link";

function Customer() {
  const [data, setData] = useState("0");
  const [on, setOn] = useState("0");
  const [off, setOff] = useState("0");

  const fetchUser = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/fetchUser`);
      const Data = await response.json();
      setData(Data.totalUser);
      setOn(Data.activeUser);
      setOff(Data.deactiveUser);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <div className="bg-dashboardBoxBG h-36 w-full px-2 py-4 rounded-lg shadow-md  flex flex-col gap-2">
        <div className=" flex items-center">
          <h2 className="text-base font-bold ml-3 text-textBlack">
            Customer status
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={"/customer"}
            className="w-full flex items-center justify-center"
          >
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              <FiUserCheck size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Active</h3>
              <p className=" text-base">{on}</p>
            </div>
          </Link>

          <Link
            href={"/customer"}
            className="w-full flex items-center justify-center"
          >
            <div className="bg-red-100 text-red-600 p-2 rounded-full">
              <FiUserX size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Deactive</h3>
              <p className=" text-base">{off}</p>
            </div>
          </Link>

          {/* <Link href={'/customer'} className="w-full flex items-center">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <FiUsers size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Total</h3>
              <p className=" text-base">{data}</p>
            </div>
          </Link> */}
        </div>

        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold ml-3">Total Customer :- </h2>
          <h1 className="text-base"> {data || "0"}</h1>
        </div>
      </div>
    </div>
  );
}

export default Customer;
