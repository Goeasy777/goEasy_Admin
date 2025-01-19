"use client";
import React, { useEffect, useState } from "react";
import { AiTwotoneProfile } from "react-icons/ai";
import { FaImages } from "react-icons/fa";
import { MdCategory, MdOutlineCategory } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { IoGrid } from "react-icons/io5";
import Link from "next/link";

function Section() {
  const [banner, setBanner] = useState();
  const [coupon, setCoupon] = useState();
  const [offer, setOffer] = useState();

  const fetchSections = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/fetchBannerForD`
      );

      const bannerData = await response.json();
      setBanner(bannerData.totalBanner);
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/fetchCouponcodeforD`
      );

      const couponData = await response.json();

      setCoupon(couponData.totalCoupon);
    } catch (error) {
      console.error("Error fetching coupon data:", error);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/fetchOfferSectionForD`
      );

      const offerData = await response.json();

      setOffer(offerData.totalOffer);
    } catch (error) {
      console.error("Error fetching offer data:", error);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <div>
      <div className="bg-dashboardBoxBG h-36 w-full px-2 py-4 rounded-lg shadow-md  flex flex-col gap-2">
        <div className=" flex items-center">
          <h2 className="text-base font-bold ml-3 text-textBlack">Section</h2>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Link href={"/banner/list"} className="w-full flex items-center">
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              <FaImages size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Banner</h3>
              <p className=" text-base">{banner || "0"}</p>
            </div>
          </Link>

          <Link href={"/coupon/list"} className="w-full flex items-center">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <BiSolidOffer size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Coupon</h3>
              <p className=" text-base">{coupon || "0"}</p>
            </div>
          </Link>

          <Link href={"/section/list"} className="w-full flex items-center">
            <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
              <IoGrid size={20} />
            </div>

            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Offer</h3>
              <p className=" text-base">{offer || "0"}</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold ml-3">Total Section :- </h2>
          <h1 className="text-base">{banner + coupon + offer || "0"}</h1>
        </div>
      </div>
    </div>
  );
}

export default Section;


