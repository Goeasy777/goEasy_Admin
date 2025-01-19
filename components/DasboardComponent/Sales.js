"use client";
import React, { useEffect, useState } from "react";
import { GrMoney } from "react-icons/gr";
import { MdCategory } from "react-icons/md";

const Sales = () => {
  // const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getOrderAmount`
      );

      // Ensure response is converted to JSON
      const Data = await response.json();

      // Set the extracted JSON data
      setTotal(Data.totalAmount);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <div className="bg-dashboardBoxBG h-36 w-full px-2 py-4 rounded-lg shadow-md  grid items-center justify-center grid-cols-[40%_60%]">
        <div className="flex items-center justify-center">
          <div className="bg-green-100 text-green-600 p-5 rounded-full h-fit w-fit">
            <GrMoney size={40} />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 text-textBlack">
          <h2 className="text-2xl font-bsemi">Sales :-</h2>
          <h2 className="text-3xl"> Rs. {total || "0"}</h2> {/* Display total sales */}
        </div>
      </div>
    </div>
  );
};

export default Sales;
