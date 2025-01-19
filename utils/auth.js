"use client";
import React from "react";
const { useRouter } = require("next/navigation");
const { useSelector } = require("react-redux");

const Auth = () => {
  const { isAuthenticated, errors } = useSelector(
    (state) => state.adminReducer
  );
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return <div></div>;
};

export default Auth;
