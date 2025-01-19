"use client";
import Button from "@/components/Button";
import { addnotification } from "@/store/Actions/adminActions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const page = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  const [usertype, setUsertype] = useState("");
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);


  const addNotification = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    formData.append("usertype", usertype);
    formData.append("status", status);
    formData.append("image", image);

    try {
      //   const response = await dispatch(addoffersectionR(payload));
      const response = await dispatch(addnotification(formData));


      if (response.success) {
        setShowAlert({
          type: "success",
          message: "Notification added successfully!",
        });
      } else {
        setShowAlert({
          type: "error",
          message: response.message || "Failed to add Notification.",
        });
      }

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
      // setTimeout(() => router.push("/section/list"), 3000);
    } catch (error) {
      console.error("Error during submission:", error);
      setShowAlert({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
    }

    setImage("");
    setTitle("");
    setMessage("");
    setStatus("");
    setUsertype("");
  };

  const Status = () => {
    return (
      <div className="flex flex-col h-fit w-full gap-2 ">
        <h4 className="ml-3 text-lg">Select Status Type</h4>
        <select
          className="p-3 bg-inputBG border-none shadow-sm"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select a Type...</option>
          <option value="Publish">Publish</option>
          <option value="Unpublish">Unpublish</option>
        </select>
      </div>
    );
  };

  const Usertype = () => {
    return (
      <div className="flex flex-col h-fit w-full gap-2 ">
        <h4 className="ml-3 text-lg">Select User Type</h4>
        <select
          className="p-3 bg-inputBG border-none shadow-sm"
          name="usertype"
          value={usertype}
          onChange={(e) => setUsertype(e.target.value)}
        >
          <option value="">Select a Type...</option>
          <option value="Vendor">Vendor</option>
          <option value="User">User</option>
        </select>
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md ">
      <h1 className="py-4 px-6  text-xl w-full  border-none shadow-sm rounded-sm bg-headerBG">
        Push Notification
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
        onSubmit={addNotification}
        encType="multipart/form-data"
      >
        <div className="flex flex-col h-fit w-full gap-2">
          <h4 className="ml-3 text-lg">Notification Title</h4>
          <input
            type="text"
            className="p-3 bg-inputBG border-none shadow-sm"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Notification Title"
          />
        </div>

        <div className="flex flex-col h-fit w-full gap-2">
          <h4 className="ml-3 text-lg">Notification Message</h4>
          <input
            type="text"
            className="p-3 bg-inputBG border-none shadow-sm"
            placeholder="Enter Notification Message"
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex flex-col h-fit w-full gap-2">
          <label htmlFor="image" className="ml-3 text-lg text-textBlack">
            Notification Image
          </label>

          <div className="flex w-1/2 flex-row gap-2 p-1 items-center border-none shadow-sm bg-inputBG">
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

        <div className="w-full grid grid-cols-2 gap-3">
          <Usertype />

          <Status />
        </div>

        <Button props={"Push Notification"} />
      </form>
    </div>
  );
};

export default page;
