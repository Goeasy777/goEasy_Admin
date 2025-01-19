"use client";
import Button from "@/components/Button";
import { addoffersectionR } from "@/store/Actions/adminActions";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const page = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [childcategory, setChildCategory] = useState("");
  const [title, setTitle] = useState("");
  // const [price, setPrice] = useState("");s
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");

  const [categoriesList, setCategoriesList] = useState([]);
  const [subcategoriesList, setSubCategoriesList] = useState([]);
  const [childcategoriesList, setChildCategoriesList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);


  const dispatch = useDispatch();
  const router = useRouter();

  const addOffersectionHandler = async (e) => {
    e.preventDefault();

    if (!category) {
      alert("Category and Status are required!");
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("status", status);
    formData.append(
      "child",
      JSON.stringify([
        {
          title,
          // price,
          subcategory,
          childcategory,
          image: image.name, // Reference the file name
        },
      ])
    );
    formData.append("child[0][image]", image); // Upload file

    try {
      //   const response = await dispatch(addoffersectionR(payload));
      const response = await dispatch(addoffersectionR(formData));

      if (response.success) {
        setShowAlert({
          type: "success",
          message: "Offer section added successfully!",
        });
      } else {
        setShowAlert({
          type: "error",
          message: response.message || "Failed to add offer section.",
        });
      }

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
      setTimeout(() => router.push("/section/list"), 3000);
    } catch (error) {
      console.error("Error during submission:", error);
      setShowAlert({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
    }

    // Reset form fields
    setCategory("");
    setSubCategory("");
    setChildCategory("");
    setTitle("");
    // setPrice("");
    setStatus("");
    setImage("");
    // router.push("/section/list");
  };

  // Fetch Category Data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getCategory`
        );
        if (Array.isArray(data.category)) {
          setCategoriesList(data.category);
        } else {
          console.error("Unexpected response format for categories.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Subcategories based on Category
  useEffect(() => {
    if (category) {
      const fetchSubCategories = async () => {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getsubcategory/${category}`
          );
          if (Array.isArray(data.data)) {
            setSubCategoriesList(data.data);
          } else {
            console.error("Unexpected response format for subcategories.");
          }
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };
      fetchSubCategories();
    }
  }, [category]);

  // Fetch Child Categories based on Subcategory
  useEffect(() => {
    if (subcategory) {
      const fetchChildCategories = async () => {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getchildcategory/${subcategory}`
          );
          if (Array.isArray(data.data)) {
            setChildCategoriesList(data.data);
          } else {
            console.error("Unexpected response format for child categories.");
          }
        } catch (error) {
          console.error("Error fetching child categories:", error);
        }
      };
      fetchChildCategories();
    }
  }, [subcategory]);

  // Dropdown change handlers
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory("");
    setChildCategory("");
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
    setChildCategory("");
  };

  const Status = () => (
    <div className="flex flex-col h-fit w-full gap-2">
      <h4 className="ml-3 text-lg">Offer Status</h4>
      <select
        className="p-3 border-none rounded-sm bg-inputBG shadow-sm"
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Select status...</option>
        <option value="Publish">Publish</option>
        <option value="Unpublish">Unpublish</option>
      </select>
    </div>
  );

  return (
    <div className="flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md shadow-md">
      <h1 className="py-4 px-6 text-xl w-full border-none bg-headerBG rounded-sm shadow-sm">
        Add Offer Section
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
        encType="multipart/form-data"
        onSubmit={addOffersectionHandler}
      >
        <div className="w-full grid grid-cols-2 gap-3">

          <div className="flex flex-col h-fit w-full gap-2">
            <label htmlFor="category" className="ml-3 text-lg">
              Service Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={handleCategoryChange}
              className="p-3 border-none rounded-sm bg-inputBG shadow-sm appearance-none w-full text-gray-700"
            >
              <option value="">Select Service Category</option>
              {categoriesList.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategories Dropdown */}
          <div className="flex flex-col h-fit w-full gap-2">
            <label htmlFor="subcategory" className="ml-3 text-lg">
              Service Sub Category
            </label>
            <select
              id="subcategory"
              name="subcategory"
              value={subcategory}
              onChange={handleSubCategoryChange}
              className="p-3 border-none rounded-sm bg-inputBG shadow-sm appearance-none w-full text-gray-700"
            >
              <option value="">Select Service Sub Category</option>
              {subcategoriesList.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.subcategory}
                </option>
              ))}
            </select>
          </div>

        </div>


        <div className="w-full grid grid-cols-2 gap-3">

          {/* Child Categories Dropdown */}
          <div className="flex flex-col h-fit w-full gap-2">
            <label htmlFor="childcategory" className="ml-3 text-lg">
              Service Child Category
            </label>
            <select
              id="childcategory"
              name="childcategory"
              value={childcategory}
              onChange={(e) => setChildCategory(e.target.value)}
              className="p-3 border-none rounded-sm bg-inputBG shadow-sm appearance-none w-full text-gray-700"
            >
              <option value="">Select Service Child Category</option>
              {childcategoriesList.map((child) => (
                <option key={child._id} value={child._id}>
                  {child.childcategory}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col h-fit w-full gap-2">
            <h4 className="ml-3 text-lg">Offer Title</h4>
            <input
              type="text"
              className="p-3 border-none rounded-sm bg-inputBG shadow-sm"
              placeholder="Enter Offer Title"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

        </div>

        {/* Title and Price */}
        {/* > */}

        {/* Image Upload */}
        <div className="w-full grid grid-cols-2 gap-3">
          <div className="flex flex-col h-fit w-full gap-2">
            <label htmlFor="image" className="ml-3 text-lg">
              Offer Image
            </label>
            <div className="flex w-full flex-row gap-2 p-1 items-center shadow-sm bg-inputBG border-none">
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                // onChange={handleImageChange}
                className="border-none w-[100px]"
              />
              <p>
                Add Photo |{" "}
                <span className={image ? "text-green-400" : "text-red-600"}>
                  {image ? image.name : "No file chosen"}
                </span>
              </p>
            </div>
          </div>

          {/* Status Dropdown */}
          <Status />
        </div>

        <Button props={"Add Offer Section"} />
      </form>
    </div>
  );
};

export default page;
