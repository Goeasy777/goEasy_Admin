"use client";
import React, { useEffect, useState } from "react";
import { AiTwotoneProfile } from "react-icons/ai";
import {
  MdAddLocationAlt,
  MdCategory,
  MdOutlineCategory,
} from "react-icons/md";
import { TbLocationBolt } from "react-icons/tb";
import { IoLocation } from "react-icons/io5";
import Link from "next/link";

function City() {
  const [data, setData] = useState("0");
  const [publish, setPublish] = useState("0");
  const [unpublish, setUnpublish] = useState("0");
// huihuihui 
  const fetchCity = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/fetchCityForD`
      );
      // Ensure response is converted to JSON
      const Data = await response.json();

      setData(Data.totalCity);
      setPublish(Data.publishCity);
      setUnpublish(Data.unpublishCity);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  useEffect(() => {
    fetchCity();
  }, []);

  return (
    <div>
      <div className="bg-dashboardBoxBG h-36 w-full px-2 py-4 rounded-lg shadow-md  flex flex-col gap-2">
        <div className=" flex items-center">
          <h2 className="text-base font-bold ml-3 text-textBlack">
            City status
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={"/city/list"}
            className="w-full flex items-center justify-center"
          >
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              <IoLocation size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Active</h3>
              <p className=" text-base">{publish || "0"}</p>
            </div>
          </Link>

          <Link
            href={"/city/list"}
            className="w-full flex items-center justify-center"
          >
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <TbLocationBolt size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Ready</h3>
              <p className=" text-base">{unpublish || "0"}</p>
            </div>
          </Link>

          {/* <Link href={"/city/list"} className="w-full flex items-center">
            <div className=" bg-purple-100 text-purple-600 p-2 rounded-full">
              <MdAddLocationAlt size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Total</h3>
              <p className=" text-base">{data}</p>
            </div>
          </Link> */}
        </div>

        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold ml-3">Total City :- </h2>
          <h1 className="text-base"> {data || "0"}</h1>
        </div>
      </div>
    <div><p>hi</p></div>
    </div>
  );
}

export default City;
