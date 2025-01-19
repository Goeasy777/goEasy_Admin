"use client";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const page = ({ params }) => {
  const { id } = params;

  console.log(id);

  const dispatch = useDispatch();
  const router = useRouter();

  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const updateCityHandler = async (e) => {
    e.preventDefault();
    try {
      const Acity = { city, status };
      console.log(Acity);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updatecity/${id}`,
          Acity
        );

        console.log(response.data);

        if (response.data.success) {
          setShowAlert({
            type: "success",
            message: "City updated successfully!",
          });
        } else {
          setShowAlert({
            type: "error",
            message: response.message || "Failed to update City.",
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
      // router.push("/city/list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md">
      <h1 className="py-4 px-6 text-xl w-full border-none shadow-sm bg-headerBG rounded-md">
        Update City
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
        onSubmit={updateCityHandler}
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

        <Button props={"Update City"} />
      </form>
    </div>
  );
};

export default page;
