"use client";
import React, { useEffect } from "react";
import Signin from "./admin/signin/page";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const page = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated } = useSelector((state) => state.adminReducer);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("hrlloo");

      router.push("/admin/signin");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-full w-full flex bg-white">
      <Signin />
    </div>
  );
};

export default page;
