"use client";
import Button from "@/components/Button";
import { addbanner } from "@/store/Actions/adminActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const AddBannerPage = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const addBannerHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("status", status);
    formData.append("image", image);

    try {
      const response = await dispatch(addbanner(formData));
      if (response.success) {
        setShowAlert({
          type: "success",
          message: "Banner added successfully!",
        });
      } else {
        setShowAlert({
          type: "error",
          message: response.message || "Failed to add Banner.",
        });
      }

      setTimeout(() => setShowAlert(null), 3000);
      setTimeout(() => router.push("/banner/list"), 3000);
    } catch (error) {
      setShowAlert({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });

      setTimeout(() => setShowAlert(null), 3000);
    }

    setTitle("");
    setStatus("");
    setImage(null);
  };

  const Status = () => (
    <div className="flex flex-col h-fit w-full gap-2">
      <h4 className="ml-3 text-lg text-textBlack">Banner Status</h4>
      <select
        className="p-3 rounded-sm bg-inputBG border-none shadow-sm"
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
    <div className="flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md">
      <h1 className="py-4 px-6 text-xl w-full border-[1px] rounded-md outline-none border-none shadow-sm bg-headerBG text-textBlack">
        Add Banner
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
        encType="multipart/form-data"
        className="flex flex-col gap-8 items-start"
        onSubmit={addBannerHandler}
      >

        <div className="flex flex-col h-fit w-full gap-2">
          <h4 className="ml-3 text-lg text-textBlack">Banner Title</h4>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border-none bg-inputBG  shadow-sm"
            type="text"
            placeholder="Enter Title"
          />
        </div>

        <div className="w-full flex items-center justify-center gap-3">
          <div className="flex flex-col h-fit w-full gap-2">
            <label htmlFor="image" className="ml-3 text-lg text-textBlack">
              Banner Image
            </label>
            <div className="flex w-full flex-row gap-2 p-1 items-center border-[1px] bg-inputBG border-none shadow-sm">
              <input
                id="image"
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="border-[1px] bg-inputBG border-none w-[100px]"
              />
              <p>
                Add Photo |{" "}
                <a className={`${image ? "text-green-400" : "text-red-600"}`}>
                  {image ? image.name : "No file chosen"}
                </a>
              </p>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="flex flex-col h-fit w-full gap-2">
            <Status />
          </div>
        </div>

        <Button props={"Add Banner"} />
      </form>
    </div>
  );
};

export default AddBannerPage;

