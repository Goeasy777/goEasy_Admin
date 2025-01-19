"use client";
import React, { useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { IoTriangle } from "react-icons/io5";
import Link from "next/link";

function Categories() {
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState();
  const [childcategory, setChildcategory] = useState();
  const [total, setTotal] = useState();

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/fetchCategory`);

      const categoryData = await response.json();

      setCategory(categoryData.totalCategory);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/fetchSubcategory`
      );

      const subcategoryData = await response.json();

      setSubcategory(subcategoryData.totalsubcategory);
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/fetchChildcategory`
      );

      const childcategoryData = await response.json();

      setChildcategory(childcategoryData.totalChildCategory);
    } catch (error) {
      console.error("Error fetching childcategory data:", error);
    }

  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="h-36 w-full bg-dashboardBoxBG px-2 py-4 rounded-lg shadow-md flex flex-col gap-2">
        <div className=" flex items-center ">
          <h2 className="text-base font-bold ml-3 text-textBlack">
            Category Status
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center ">
          <Link
            href={"/category/list"}
            className="w-full flex items-center justify-center"
          >
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              <IoTriangle size={20} />
            </div>
            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Main</h3>
              <p className=" text-base">{category || "0"}</p>
            </div>
          </Link>

          <Link
            href={"subcategory/list"}
            className="w-full flex items-center justify-center"
          >
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <MdCategory size={20} />
            </div>
            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Sub</h3>
              <p className=" text-base">{subcategory || "0"}</p>
            </div>
          </Link>

          <Link
            href={"childcategory/list"}
            className="w-full flex items-center justify-center"
          >
            <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
              <BiSolidCategory size={20} />
            </div>
            <div className="ml-2 flex flex-col items-center justify-center text-textBlack">
              <h3 className="text-sm font-semibold">Child</h3>
              <p className=" text-base">{childcategory || "0"}</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold ml-3">Total :- </h2>
          {/* <h1 className='text-base'>{category + subcategory + childcategory}</h1> */}
          <h1 className="text-base">
            {category + subcategory + childcategory || "0"}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Categories;
