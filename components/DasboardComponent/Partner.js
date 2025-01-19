"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiTwotoneProfile } from "react-icons/ai";
import { MdCategory, MdOutlineCategory } from "react-icons/md";
import {
  RiUserFollowFill,
  RiUserForbidFill,
  RiUserSearchFill,
} from "react-icons/ri";

function Partner() {
  const [active, setActive] = useState("0");
  const [deactive, setDeactive] = useState("0");
  const [pending, setPending] = useState("0");
  const [total, setTotal] = useState("0");

  const fetchPartner = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/partner/fetchpartnerford`
    );
    const data = await response.json();

    setActive(data.activePartner);
    setDeactive(data.deactivePartner);
    setPending(data.upPublishPartner);
    setTotal(data.totalPartner);
  };
  useEffect(() => {
    fetchPartner();
  }, []);

  return (
    <div>
      <div className="bg-dashboardBoxBG h-36 w-full px-2 py-4 rounded-lg shadow-md  flex flex-col gap-2">
        <div className=" flex items-center">
          <h2 className="base font-bold ml-3 text-textBlack">Partner status</h2>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Link href={"/partner/list"} className="w-full flex items-center">
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              <RiUserFollowFill size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Active</h3>
              <p className=" base">{active}</p>
            </div>
          </Link>

          <Link href={"/partner/list"} className="w-full flex items-center">
            <div className="bg-red-100 text-red-600 p-2 rounded-full">
              <RiUserForbidFill size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Deactive</h3>
              <p className=" base">{deactive}</p>
            </div>
          </Link>

          <Link href={"/partner/list"} className="w-full flex items-center">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <RiUserSearchFill size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Pending</h3>
              <p className=" base">{pending}</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold ml-3">Total Partner :- </h2>
          <h1 className="text-base"> {total || "0"}</h1>
        </div>
      </div>
    </div>
  );
}

export default Partner;
