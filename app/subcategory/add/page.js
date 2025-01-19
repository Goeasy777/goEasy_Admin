"use client";
import Button from "@/components/Button";
import { addsubcategory } from "@/store/Actions/adminActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const page = () => {
  const [subcategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const addSubCategoryHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("status", status);
    formData.append("image", image);
    formData.append("rating", rating);

    try {
      //   const response = await dispatch(addoffersectionR(payload));
      const response = await dispatch(addsubcategory(formData));

      if (response.success) {
        setShowAlert({
          type: "success",
          message: "Subcategory added successfully!",
        });
      } else {
        setShowAlert({
          type: "error",
          message: response.message || "Failed to add Subcategory.",
        });
      }

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
      setTimeout(() => router.push("/subcategory/list"), 3000);
    } catch (error) {
      console.error("Error during submission:", error);
      setShowAlert({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
    }

    setSubCategory("");
    setCategory("");
    setStatus("");
    setImage("");

    // router.push("/subcategory/list");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getCategory`
        ); // API endpoint to fetch categories

        // Check if the category key exists and is an array
        if (Array.isArray(response.data.category)) {
          setCategoriesList(response.data.category);
        } else {
          console.error(
            "Error: Expected an array but got:",
            response.data.category
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const Status = () => {
    return (
      <div className="flex flex-col h-fit w-full gap-2">
        <h4 className="ml-3 text-textBlack text-lg">Category Status</h4>
        <select
          className="p-3 shadow-sm bg-inputBG border-none"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select status...</option>
          <option value="Publish">Publish</option>
          <option value="Unpublish">Unpublish</option>
        </select>
      </div>
    );
  };

  return (
    <div className="flex flex-col py-10 px-14 gap-10 bg-formBG">
      <h1 className="py-4 px-6 text-xl w-full  border-none shadow-sm bg-headerBG text-textBlack">
        Add Sub Category
      </h1>

      {showAlert && (
        <Alert
          className="absolute w-80 top-30 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          icon={
            showAlert.type === "success" ? (
              <CheckIcon fontSize="inherit" />
            ) : null
          }
          severity={showAlert.type}
        >
          {showAlert.message}
        </Alert>
      )}

      <form
        className="flex flex-col gap-8 items-start"
        onSubmit={addSubCategoryHandler}
        encType="multipart/form-data"
      >
        <div className="flex flex-col h-fit w-full gap-2">
          <label htmlFor="category" className="ml-3 text-lg text-textBlack ">
            Select Service Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border-none shadow-sm appearance-none w-full bg-inputBG text-textBlack"
          >
            <option value="">Select Service Category</option>
            {/* Ensure categoriesList is an array before using map */}
            {Array.isArray(categoriesList) &&
              categoriesList.map((categoryItem) => (
                <option key={categoryItem._id} value={categoryItem._id}>
                  {categoryItem.category}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col h-fit w-full gap-2">
          <h4 className="ml-3 text-textBlack text-lg">Sub Category Name</h4>
          <input
            name="subcategory"
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)} // Update subcategory state on change
            className="p-3 shadow-sm border-none bg-inputBG"
            type="text"
            placeholder="Enter Sub Category"
          />
        </div>

        <div className="w-full flex items-center justify-center gap-3">
          <div className="flex flex-col h-fit w-full gap-2">
            <label htmlFor="image" className="ml-3 text-lg text-textBlack">
              Subcategory Image
            </label>
            <div className="flex w-full flex-row gap-2 p-1 items-center  border-none shadow-sm bg-inputBG">
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className=" border-none  w-[100px]"
              />
              <p>
                Add Photo |{" "}
                <a className={`${image ? "text-green-400" : "text-red-600"}`}>
                  {image ? image.name : "No file chosen"}
                </a>
              </p>
            </div>
          </div>

          <Status />
        </div>

        {/* <button type="submit" className='mt-5 bg-[black] outline-none text-white py-3 px-6 text-base rounded-md'>Add Sub Category</button> */}
        <Button props={"Add Sub Category"} />
      </form>
    </div>
  );
};

export default page;
