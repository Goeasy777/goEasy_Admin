"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillAccountBook, AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";

const Order = () => {
  const [data, setData] = useState("0");
  const [pending, setPending] = useState("0");
  const [progressing, setProgressing] = useState("0");
  const [complete, setComplete] = useState("0");
  const [cancelled, setCancelled] = useState("0");

  const fetchOrder = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/fetchorder`);
      const Data = await response.json();

      setData(Data.totalOrder);
      setPending(Data.pendingOrder);
      setProgressing(Data.progressingOrder);
      setComplete(Data.completedOrder);
      setCancelled(Data.cancelledOrder);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    // <div>
    //   <div className="h-36 w-full bg-dashboardBoxBG px-2 py-4 rounded-lg shadow-md flex flex-col gap-2">
    //     <div className=" flex items-center">
    //       <h2 className="text-base font-bold ml-3 text-textBlack">
    //         Order status
    //       </h2>
    //     </div>

    //     <div className="grid grid-cols-4 gap-1">
    //       <Link
    //         href={"/order/pending"}
    //         className=" flex items-center justify-center "
    //       >
    //         <div className="bg-yellow-100 text-yellow-600 p-2.5 rounded-full ">
    //           <MdOutlinePendingActions size={20} />
    //         </div>
    //         <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
    //           <h3 className="text-sm font-semibold">Pending</h3>
    //           <p className=" text-base">{pending}</p>
    //         </div>
    //       </Link>

    //       <Link
    //         href={"/order/progressing"}
    //         className=" flex items-center justify-center "
    //       >
    //         <div className="bg-orange-100 text-orange-600 p-2.5 rounded-full ">
    //           <MdOutlinePendingActions size={20} />
    //         </div>
    //         <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
    //           <h3 className="text-sm font-semibold">Progressing</h3>
    //           <p className=" text-base">{progressing}</p>
    //         </div>
    //       </Link>

    //       <Link
    //         href={"/order/completed"}
    //         className=" flex items-center justify-center "
    //       >
    //         <div className="bg-green-100 text-green-600 p-2.5 rounded-full ">
    //           <AiFillAccountBook size={20} />
    //         </div>
    //         <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
    //           <h3 className="text-sm font-semibold">Completed</h3>
    //           <p className=" text-base">{complete}</p>
    //         </div>
    //       </Link>

    //       <Link
    //         href={"/order/cancelled"}
    //         className=" flex items-center justify-center "
    //       >
    //         <div className="bg-red-100 text-red-600 p-2.5 rounded-full ">
    //           <AiOutlineCloseCircle size={20} />
    //         </div>
    //         <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
    //           <h3 className="text-sm font-semibold">Cancel</h3>
    //           <p className=" text-base">{cancelled}</p>
    //         </div>
    //       </Link>
    //     </div>

    //     <div className="flex items-center gap-3">
    //       <h2 className="text-base font-semibold ml-3">Total Orders :- </h2>
    //       <h1 className="text-base">{data}</h1>
    //     </div>
    //   </div>
    // </div>
    <div className="h-fit w-full bg-dashboardBoxBG px-4 py-4 sm:py-4 sm:px-6 rounded-lg shadow-md flex flex-col gap-2 sm:gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-textBlack">Order Status</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <Link href="/order/pending" className="flex items-center">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
            <MdOutlinePendingActions size={20} />
          </div>
          <div className="ml-2 text-center">
            <h3 className="text-sm font-semibold">Pending</h3>
            <p className="text-base">{pending}</p>
          </div>
        </Link>
        <Link href="/order/progressing" className="flex items-center">
          <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
            <MdOutlinePendingActions size={20} />
          </div>
          <div className="ml-2 text-center">
            <h3 className="text-sm font-semibold">Progressing</h3>
            <p className="text-base">{progressing}</p>
          </div>
        </Link>
        <Link href="/order/completed" className="flex items-center">
          <div className="bg-green-100 text-green-600 p-3 rounded-full">
            <AiFillAccountBook size={20} />
          </div>
          <div className="ml-2 text-center">
            <h3 className="text-sm font-semibold">Completed</h3>
            <p className="text-base">{complete}</p>
          </div>
        </Link>
        <Link href="/order/cancelled" className="flex items-center">
          <div className="bg-red-100 text-red-600 p-3 rounded-full">
            <AiOutlineCloseCircle size={20} />
          </div>
          <div className="ml-2 text-center">
            <h3 className="text-sm font-semibold">Cancelled</h3>
            <p className="text-base">{cancelled}</p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <h2 className="text-base font-semibold">Total Orders:</h2>
        <h1 className="text-base">{data}</h1>
      </div>
    </div>
  );
};

export default Order;
