"use client";
// import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import ContactUs from "@/components/SettingComponent/ContactUs";
import PrivacyPolicy from "@/components/SettingComponent/PrivacyPolicy";
import AboutUs from "@/components/SettingComponent/AboutUs";
import TermAndConditions from "@/components/SettingComponent/TermAndConditions";

// import dynamic from "next/dynamic";
// const PrivacyPolicy = dynamic(
//   () => import("@/components/SettingComponent/PrivacyPolicy"),
//   { ssr: false }
// );
// const ContactUs = dynamic(
//   () => import("@/components/SettingComponent/ContactUs"),
//   { ssr: false }
// );
// const AboutUs = dynamic(() => import("@/components/SettingComponent/AboutUs"), {
//   ssr: false,
// });
// const TermAndConditions = dynamic(
//   () => import("@/components/SettingComponent/TermAndConditions"),
//   { ssr: false }
// );
const MyEditor = () => {
  return (
    <div className="flex flex-col gap-10 pb-5">
      <div className=" mt-3">
        <PrivacyPolicy />
      </div>
      <div className=" ">
        <ContactUs />
      </div>
      <div className=" ">
        <AboutUs />
      </div>
      <div className=" ">
        <TermAndConditions />
      </div>
    </div>
  );
};

export default MyEditor;
