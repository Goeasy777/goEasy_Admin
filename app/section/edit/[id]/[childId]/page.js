"use client";
import Button from "@/components/Button";
import { addoffersection } from "@/store/Actions/adminActions";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const page = ({ params }) => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [childcategory, setChildCategory] = useState("");
  const [title, setTitle] = useState("");
  // const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");

  const [categoriesList, setCategoriesList] = useState([]);
  const [subcategoriesList, setSubCategoriesList] = useState([]);
  const [childcategoriesList, setChildCategoriesList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id, childId } = params;

  const addOffersectionHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", category);
    formData.append("status", status);
    formData.append(
      "child",
      JSON.stringify([
        {
          title,
          subcategory,
          childcategory,
          image,
          // image: image.name, // Reference the file name
        },
      ])
    );
    // formData.append("image", imageFile);
    // formData.append("child[0][image]", image); // Upload file

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updateOfferSectionR/${id}/${childId}`,
        formData
      );

      if (response.data.success) {
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

      setTimeout(() => setShowAlert(null), 3000);
      setTimeout(() => router.push("/section/list"), 3000);

    } catch (error) {
      console.error("Error during submission:", error);
      setShowAlert({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });

      setTimeout(() => setShowAlert(null), 3000);
    }

    setCategory("");
    setSubCategory("");
    setChildCategory("");
    setTitle("");
    setStatus("");
    setImage("");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getCategory`
        );
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

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        if (category) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getsubcategory/${category}`
          );
          if (Array.isArray(response.data.data)) {
            setSubCategoriesList(response.data.data);
          } else {
            console.error(
              "Error: Expected an array but got:",
              response.data.subcategory
            );
          }
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubCategories();
  }, [category]);

  useEffect(() => {
    const fetchChildCategories = async () => {
      try {
        if (subcategory) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getchildcategory/${subcategory}`
          );
          if (Array.isArray(response.data.data)) {
            setChildCategoriesList(response.data.data);
          } else {
            console.error(
              "Error: Expected an array but got:",
              response.data.childcategory
            );
          }
        }
      } catch (error) {
        console.error("Error fetching childcategories:", error);
      }
    };
    fetchChildCategories();
  }, [subcategory]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory("");
    setChildCategory("");
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
    setChildCategory("");
  };

  const Status = () => {
    return (
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
  };

  return (
    <div className="flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md ">
      <h1 className="py-4 px-6 text-xl w-full border-none bg-headerBG rounded-sm shadow-sm">
        Update Offer Section
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
          {/* Category Dropdown */}
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
              {/* Ensure categoriesList is an array before using map */}
              {Array.isArray(categoriesList) &&
                categoriesList.map((categoryItem) => (
                  <option key={categoryItem._id} value={categoryItem._id}>
                    {categoryItem.category}
                  </option>
                ))}
            </select>
          </div>

          {/* SubCategory Dropdown */}
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
              {Array.isArray(subcategoriesList) &&
                subcategoriesList.map((subcategoryItem) => (
                  <option key={subcategoryItem._id} value={subcategoryItem._id}>
                    {subcategoryItem.subcategory}
                  </option>
                ))}
            </select>
          </div>

        </div>

        <div className="w-full grid grid-cols-2 gap-3">
          {/* ChildCategory Dropdown */}
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
              {Array.isArray(childcategoriesList) &&
                childcategoriesList.map((childcategoryItem) => (
                  <option
                    key={childcategoryItem._id}
                    value={childcategoryItem._id}
                  >
                    {childcategoryItem.childcategory}
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

        {/* <div className="flex flex-col h-fit w-full gap-2">
            <h4 className="ml-3 text-lg">Offer Price</h4>
            <input
              type="number"
              className="p-3 border-none rounded-sm bg-inputBG shadow-sm"
              value={price}
              placeholder="Enter Offer Price"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div> */}

        <div className="w-full grid grid-cols-2 gap-3">
          <div className="flex flex-col h-fit w-full gap-2">
            <label htmlFor="image" className="ml-3 text-lg  text-textBlack">
              Offer Image
            </label>

            <div className="flex w-full flex-row gap-2 p-1 items-center  shadow-sm bg-inputBG border-none">
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className=" border-none w-[100px]"
              />
              <p>
                Add Photo |{" "}
                <a className={`${image ? "text-green-400" : "text-red-600"}`}>
                  {image ? image.name : "No file chosen"}
                </a>
              </p>
            </div>
          </div>

          <Status title="Offer Section Status" />
        </div>

        <Button props={"Update Offer Section"} />
      </form >
    </div >
  );
};

export default page;
