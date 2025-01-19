"use client";
import React, { useEffect, useState } from "react";
import { FaCalendar, FaClock } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";

const page = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [Category, setCategory] = useState("");

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getorderbyuserid/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order");
      }

      const Data = await response.json();
      // console.log(Data);
      // await fetchCategory(Data.data.category);
      setData(Data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // const fetchCategory = async (category) => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getcategorybyid/${category}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch category");
  //     }
  //     const data = await response.json();
  //     setCategory(data.category);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <>
      <div className="w-full flex flex-col items-center min-h-screen py-6 px-4 gap-5">
        {data.length > 0 ? (
          data.map((key) => (
            <div className="bg-formBG w-full text-gray-800 shadow-xl font-semibold p-4 rounded-lg space-y-2 border border-gray-100">
              {/* Order Header */}
              <div className="flex items-center justify-between pb-4">
                <div className="text-xl">
                  Order Id:{" "}
                  <span className="text-indigo-600">{key.orderid}</span>
                </div>

                <div className="flex flex-col items-center text-sm text-gray-500 gap-2">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-indigo-500" />
                    <span>{key.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <FaClock className="text-indigo-500" />
                    Time - {key.time}
                  </div>
                </div>
              </div>

              {/* Service and Hire Type */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  {/* <MdDesignServices className="text-indigo-500" /> */}
                  <span className="font-medium">
                    {/* Category: {Category || "N/A"} */}
                    Category: {key?.category?.category}
                  </span>
                </div>
                <div className="font-medium text-gray-600">
                  Hire Type:{" "}
                  <span className="text-indigo-600">{key.hire_type}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 text-right">
                <div className="text-lg font-semibold text-gray-800 text-left">
                  Amount:{" "}
                  <span className="text-indigo-600">Rs. {key.bill_amount}</span>
                  <div className="text-sm text-gray-500">
                    Add-on:{" "}
                    <span className="text-green-500">+ Rs. {key.Add_on}</span>
                  </div>
                </div>

                <div className="font-medium text-gray-600">
                  Payment Mode:{" "}
                  <span className="text-indigo-600">{key.Payment_Method}</span>
                  <div className="font-medium text-gray-600">
                    Status:{" "}
                    <span className="text-indigo-600">
                      {key.current_status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-screen text-gray-500">
            No order found for this user
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default page;
