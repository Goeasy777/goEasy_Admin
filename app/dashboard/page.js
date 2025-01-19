"use client";
import Admin from "@/components/DasboardComponent/Admin";
import Categories from "@/components/DasboardComponent/Categories";
import City from "@/components/DasboardComponent/City";
import Order from "@/components/DasboardComponent/Order";
import Partner from "@/components/DasboardComponent/Partner";
import Section from "@/components/DasboardComponent/Section";
import Customer from "@/components/DasboardComponent/Customer";
import Sales from "@/components/DasboardComponent/Sales";
import React, { useEffect, useState } from "react";
import RecentRequest from "@/components/DasboardComponent/RecentRequest";
import Graph from "@/components/DasboardComponent/Graph";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Auth from "@/utils/auth";

const DashBoard = () => {
  const router = useRouter();

  const { isAuthenticated, errors } = useSelector(
    (state) => state.adminReducer
  );
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    <Auth />;
  }, []);

  return (
    //   <div className="w-full  flex flex-col bg-transparent justify-start items-start gap-10">
    //     {/* <div className=" h-fit ml-3 mt-2">
    //       <h2 className="text-2xl font-semibold py-3 px-4 rounded-md bg-white shadow-md">
    //         DashBoard
    //       </h2>
    //     </div> */}

    //     {/* Components */}
    //     <div className="h-fit w-full flex flex-wrap xl:items-center gap-3 xl:pl-3 py-1">
    //       <div className="h-fit xl:w-[60%] shrink-0">
    //         <Order />
    //       </div>

    //       <div className="h-fit xl:w-[37%] shrink-0">
    //         <Sales />
    //       </div>

    //       <div className="h-fit xl:w-[32%] shrink-0">
    //         <Customer />
    //       </div>

    //       <div className="h-fit xl:w-[32%] shrink-0">
    //         <City />
    //       </div>

    //       <div className="h-fit xl:w-[32%] shrink-0">
    //         <Admin />
    //       </div>

    //       <div className="h-fit xl:w-[32%] shrink-0">
    //         <Partner />
    //       </div>

    //       <div className="h-fit xl:w-[32%] shrink-0">
    //         <Categories />
    //       </div>

    //       <div className="h-fit xl:w-[32%] shrink-0">
    //         <Section />
    //       </div>
    //     </div>

    //     {/* graph */}
    //     <Graph />

    //     {/* recent req */}
    //     <RecentRequest />
    //   </div>
    <div className="w-full flex flex-col bg-transparent justify-start items-start gap-6 sm:gap-8 xl:gap-10">
      <div className="h-fit w-full flex flex-wrap justify-center sm:justify-start gap-3 xl:gap-5 py-1">
        <div className="h-fit w-full sm:w-[48%] xl:w-[60%] shrink-0">
          <Order />
        </div>
        <div className="h-fit w-full sm:w-[48%] xl:w-[37%] shrink-0">
          <Sales />
        </div>
        <div className="h-fit w-full sm:w-[48%] xl:w-[32%] shrink-0">
          <Customer />
        </div>
        <div className="h-fit w-full sm:w-[48%] xl:w-[32%] shrink-0">
          <City />
        </div>
        <div className="h-fit w-full sm:w-[48%] xl:w-[32%] shrink-0">
          <Admin />
        </div>
        <div className="h-fit w-full sm:w-[48%] xl:w-[32%] shrink-0">
          <Partner />
        </div>
        <div className="h-fit w-full sm:w-[48%] xl:w-[32%] shrink-0">
          <Categories />
        </div>
        <div className="h-fit w-full sm:w-[48%] xl:w-[32%] shrink-0">
          <Section />
        </div>
      </div>

      {/* Graph Section */}
      <Graph />

      {/* Recent Requests */}
      <RecentRequest />
    </div>

  );


};

export default DashBoard;
