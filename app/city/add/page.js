"use client";
import { addcity } from "@/store/Actions/adminActions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const addCityHandler = async (e) => {
    e.preventDefault();
    const Acity = { city, status };

    try {
      //   const response = await dispatch(addoffersectionR(payload));
      const response = await dispatch(addcity(Acity));
      console.log(response);

      if (response.success) {
        setShowAlert({
          type: "success",
          message: "City added successfully!",
        });
      } else {
        setShowAlert({
          type: "error",
          message: response.message || "Failed to add City.",
        });
      }

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
        setTimeout(() => router.push("/city/list"), 3000);
    } catch (error) {
      console.error("Error during submission:", error);
      setShowAlert({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
    }
    setCity("");
    setStatus("");
    // router.push('/city/list')
  };

  return (
    // <div className='h-fit w-full flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md'>
    <div className="h-fit w-full flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md">
      <h1 className="py-4 px-6 text-xl w-full border-[1px] rounded-md outline-none border-none shadow-sm bg-headerBG text-textBlack">
        Add City
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
        onSubmit={addCityHandler}
        className="flex flex-col gap-8 items-start"
      >
        <div className="flex flex-col h-fit w-full gap-2">
          <h4 className="ml-3 text-lg text-textBlack">City Name</h4>
          <input
            className="p-3 rounded-sm outline-none border-none shadow-sm bg-inputBG"
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="flex flex-col h-fit w-full gap-2">
          <h4 className="ml-3 text-lg text-textBlack">City Status</h4>
          <select
            className="p-3 rounded-sm outline-none border-none shadow-sm bg-inputBG"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select status...</option>
            <option value="Publish">Publish</option>
            <option value="Unpublish">Unpublish</option>
          </select>
        </div>

        <Button props={"Add City"} />
      </form>
    </div>
  );
};

export default page;
