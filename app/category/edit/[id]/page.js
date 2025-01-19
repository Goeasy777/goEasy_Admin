"use client";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const page = ({ params }) => {
  const [category, setCategory] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null); // Handle file as an object
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = params;

  const updateCategoryHandler = async (e) => {
    e.preventDefault();

    // Using FormData to handle file uploads
    const formData = new FormData();
    formData.append("category", category);
    formData.append("subtitle", subtitle);
    formData.append("status", status);
    formData.append("image", image); // Append image file

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updateCategory/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      if (response.data.success) {
        setShowAlert({
          type: "success",
          message: "Category update successfully!",
        });
      } else {
        setShowAlert({
          type: "error",
          message: response.message || "Failed to update Category.",
        });
      }

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
      setTimeout(() => router.push("/category/list"), 3000);
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
    setSubtitle("");
    setStatus("");
    setImage("");
  };

  const Status = () => {
    return (
      <div className="flex flex-col h-fit w-full gap-2">
        <h4 className="ml-3 text-lg">Category Status</h4>
        <select
          className="p-3 shadow-sm border-none bg-inputBG"
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
    <div className="flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md">
      <h1 className="py-4 px-6 text-xl w-full border-none shadow-sm bg-headerBG">
        Update Category
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
        onSubmit={updateCategoryHandler}
        encType="multipart/form-data"
      >
        <div className="flex flex-col h-fit w-full gap-2">
          <h4 className="ml-3 text-lg">Category Name</h4>
          <input
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3  border-none shadow-sm bg-inputBG"
            type="text"
            placeholder="Enter Category"
          />
        </div>

        <div className="flex flex-col h-fit w-full gap-2">
          <h4 className="ml-3 text-lg">Subtitle</h4>
          <input
            name="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="p-3  border-none shadow-sm bg-inputBG"
            type="text"
            placeholder="Enter Subtitle"
          />
        </div>

        <div className=" w-full flex items-center justify-center gap-3">
          <div className="flex flex-col h-fit w-full gap-2">
            <label htmlFor="image" className="ml-3 text-lg text-textBlack">
              Category Image
            </label>

            <div className="flex w-full flex-row gap-2 p-1 items-center border-[1px] bg-inputBG border-none shadow-sm">
              <input
                id="image"
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className=" border-[1px] bg-inputBG border-none w-[100px]"
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

        {/* <button type="submit" className='mt-5 bg-[black] outline-none text-white py-3 px-6 text-base rounded-md'>Add Category</button> */}
        <Button props={"Update Category"} />
      </form>
    </div>
  );
};

export default page;
