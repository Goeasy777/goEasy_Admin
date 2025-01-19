"use client";
import Button from "@/components/Button";
import { addchildcategory } from "@/store/Actions/adminActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const page = ({ params }) => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [subcategoriesList, setSubCategoriesList] = useState([]);

  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [childcategory, setChildCategory] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [city, setCity] = useState("");
  const [platformCharge, setPlatformCharge] = useState("");
  const [servicetime, setServiceTime] = useState("");
  const [serviceQuantity, setServiceQuantity] = useState("");
  const [maxquantity, setMaxQuantity] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const updateChildCategoryHandler = async (e) => {
    e.preventDefault();
    const { id } = params;
    const formData = new FormData();
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("childcategory", childcategory);
    formData.append("status", status);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("platformCharge", platformCharge);
    formData.append("servicetime", servicetime);
    formData.append("maxquantity", maxquantity);
    formData.append("image", image);
    formData.append("serviceQuantity", serviceQuantity);
    formData.append("serviceDescription", serviceDescription);
    formData.append("city", city);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updateChildCategory/${id}`,
        formData
      );

      if (response.data.success) {
        setShowAlert({
          type: "success",
          message: "Childcategory updated successfully!",
        });
      } else {
        setShowAlert({
          type: "error",
          message: response.message || "Failed to update Childcategory.",
        });
      }

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
      setTimeout(() => router.push("/childcategory/list"), 3000);
    } catch (error) {
      console.error("Error during submission:", error);
      setShowAlert({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
    }

    setCategory("");
    setSubCategory("");
    setChildCategory("");
    setPrice("");
    setDiscount("");
    setPlatformCharge("");
    setServiceTime("");
    setMaxQuantity("");
    setImage(null);
    setStatus("");
    setServiceQuantity("");
    setServiceDescription("");
    setCity("");

    // router.push("/childcategory/list");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getCategory`
        ); // API endpoint to fetch categories

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

    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getSubcategory`
        ); // API endpoint to fetch subcategories

        if (Array.isArray(response.data.subcategory)) {
          setSubCategoriesList(response.data.subcategory);
        } else {
          console.error(
            "Error: Expected an array but got:",
            response.data.subcategory
          );
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);

  const Status = () => {
    return (
      <div className="flex flex-col h-fit w-full gap-2">
        <h4 className="ml-3 text-lg">Category Status</h4>
        <select
          className="p-3 border-none bg-inputBG shadow-sm"
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
    <div className="flex flex-col py-10 px-14 gap-10 rounded-md bg-formBG">
      <h1 className="py-4 px-6 text-xl w-full border-none shadow-sm text-textBlack bg-headerBG">
        Update Child Category
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
        onSubmit={updateChildCategoryHandler}
        encType="multipart/form-data"
      >
        {/* Category */}
        <div className="flex flex-col h-fit w-full gap-2">
          <label htmlFor="category" className="ml-3 text-lg  text-textBlack">
            Select Service Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border-none shadow-sm appearance-none w-full text-textBlack bg-inputBG"
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

        {/* Subategory */}
        <div className="flex flex-col h-fit w-full gap-2">
          <label htmlFor="category" className="ml-3 text-lg  text-textBlack">
            Select Service Sub Category
          </label>
          <select
            id="subcategory"
            name="subcategory"
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="p-3 border-none shadow-sm appearance-none w-full bg-inputBG text-textBlack"
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

        {/* Child Category Input */}
        <div className="flex flex-col h-fit w-full gap-2">
          <h4 className="ml-3 text-lg text-textBlack">Child Category Name</h4>
          <input
            name="childcategory"
            value={childcategory}
            onChange={(e) => setChildCategory(e.target.value)}
            className="p-3 shadow-sm bg-inputBG border-none "
            type="text"
            placeholder="Enter Child Category"
          />
        </div>

        {/* Price, Discount, City Inputs */}
        <div className="grid grid-cols-3 w-full gap-3">
          <div className="flex flex-col h-fit gap-2">
            <h4 className="ml-3 text-lg text-textBlack">Price</h4>
            <input
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-3 shadow-sm bg-inputBG border-none"
              type="number" // Changed to number
              placeholder="Enter Price"
            />
          </div>

          <div className="flex flex-col h-fit gap-2">
            <h4 className="ml-3 text-lg text-textBlack">Discount</h4>
            <input
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="p-3 shadow-sm bg-inputBG border-none"
              type="number" // Changed to number
              placeholder="Enter Discount"
            />
          </div>

          <div className="flex flex-col h-fit gap-2">
            <h4 className="ml-3 text-lg text-textBlack">City</h4>
            <input
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-3 shadow-sm bg-inputBG border-none"
              type="text"
              placeholder="Enter City"
            />
          </div>
        </div>

        {/* Platform Charge, Service Time, Service Quantity Inputs */}
        <div className="grid grid-cols-3 w-full gap-3">
          <div className="flex flex-col h-fit gap-2">
            <h4 className="ml-3 text-lg text-textBlack">Platform Charge</h4>
            <input
              name="platformCharge"
              value={platformCharge}
              onChange={(e) => setPlatformCharge(e.target.value)}
              className="p-3 shadow-sm bg-inputBG border-none"
              type="number" // Changed to number
              placeholder="Enter Platform Charge"
            />
          </div>

          <div className="flex flex-col h-fit gap-2">
            <h4 className="ml-3 text-lg text-textBlack">Service Time</h4>
            <input
              name="servicetime"
              value={servicetime}
              onChange={(e) => setServiceTime(e.target.value)}
              className="p-3 shadow-sm bg-inputBG border-none"
              type="text"
              placeholder="Enter Service Time"
            />
          </div>

          <div className="flex flex-col h-fit gap-2">
            <h4 className="ml-3 text-lg text-textBlack">Service Quantity</h4>
            <input
              name="serviceQuantity"
              value={serviceQuantity}
              onChange={(e) => setServiceQuantity(e.target.value)}
              className="p-3 shadow-sm bg-inputBG border-none"
              type="number" // Changed to number
              placeholder="Enter Service Quantity"
            />
          </div>
        </div>

        {/* Max Quantity and Service Description */}
        <div className="grid grid-cols-2 w-full gap-3">
          <div className="flex flex-col h-fit gap-2">
            <h4 className="ml-3 text-lg text-textBlack">Max Quantity</h4>
            <input
              name="maxQuantity"
              value={maxquantity}
              onChange={(e) => setMaxQuantity(e.target.value)}
              className="p-3 shadow-sm bg-inputBG border-none"
              type="number" // Changed to number
              placeholder="Enter Max Quantity"
            />
          </div>

          <Status />
        </div>

        {/* Image and Desc */}
        <div className="grid grid-cols-2 w-full gap-3">
          {/* File Upload */}
          <div className="flex flex-col h-fit w-full gap-2">
            <label htmlFor="image" className="ml-3 text-lg  text-textBlack">
              Subcategory Image
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

          {/* description */}
          <div className="flex flex-col h-fit gap-2">
            <h4 className="ml-3 text-lg text-textBlack">Service Description</h4>
            <textarea
              name="serviceDescription"
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              className="px-3 py-3 shadow-sm bg-inputBG border-none h-fit"
              placeholder="Enter Service Description"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button props={"Update Child Category"} />
      </form>
    </div>
  );
};

export default page;
