"use client";
import Button from "@/components/Button";
import { addTimeAndSlot } from "@/store/Actions/adminActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";


const Page = () => {
  const [selectCategory, setSelectCategory] = useState("");
  const [nextdate, setNextdate] = useState("");
  const [dateday, setDateday] = useState("");
  const [timeslots, setTimeslots] = useState([]); // Holds selected timeslots
  const [categoriesList, setCategoriesList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const timeslotOptions = [
    "08:00AM",
    "08:30AM",
    "09:00AM",
    "09:30AM",
    "10:00AM",
    "10:30AM",
    "11:00AM",
    "11:30AM",
    "12:00PM",
    "12:30PM",
    "01:00PM",
    "01:30PM",
    "02:00PM",
    "02:30PM",
    "03:00PM",
    "03:30PM",
    "04:00PM",
    "04:30PM",
    "05:00PM",
    "05:30PM",
    "06:00PM",
    "06:30PM",
    "07:00PM",
    "07:30PM",
    "08:00PM",
  ];
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getCategory`
        );
        if (response.data?.category) {
          setCategoriesList(response.data.category);
        } else {
          console.error(
            "Error: Invalid category data received:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // setErrorMessage("Failed to load service categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setTimeslots((prev) =>
      prev.includes(value)
        ? prev.filter((slot) => slot !== value)
        : [...prev, value]
    );
  };

  const addTimeSlotHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        category: selectCategory,
        nextdate,
        dateday,
        timeslotlist: timeslots,
      };
      const response = await dispatch(addTimeAndSlot(payload));

      if (response.success) {
        setShowAlert({
          type: "success",
          message: "Time slot added successfully!",
        });
      } else {
        setShowAlert({
          type: "error",
          message: response.message || "Failed to add Time slot.",
        });
      }

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
      setTimeout(() => router.push("/timeslot/list"), 3000);
    } catch (error) {
      console.error("Error during submission:", error);
      setShowAlert({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
    }

    // setSuccessMessage("Timeslot and date added successfully!");
    setSelectCategory("");
    setNextdate("");
    setDateday("");
    setTimeslots([]);

  };

  return (
    <div className="flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md">
      <h1 className="py-4 px-6 text-xl w-full border-none shadow-sm text-textBlack bg-headerBG">
        Add Timeslot and Date
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
        onSubmit={addTimeSlotHandler}
        encType="multipart/form-data"
      >
        <div className="flex flex-col h-fit w-full gap-2">
          <label htmlFor="category" className="ml-3 text-lg text-textBlack">
            Service Category
          </label>
          <select
            id="category"
            name="category"
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
            className="p-3 border-none shadow-sm appearance-none w-full bg-inputBG"
          >
            <option value="">Select Service Category</option>
            {categoriesList.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col h-fit w-full gap-2">
          <label className="ml-3 text-lg text-textBlack">
            Current or Next Date?
          </label>
          <select
            value={nextdate}
            onChange={(e) => setNextdate(e.target.value)}
            className="p-3 border-none shadow-sm bg-inputBG"
          >
            <option value="">Select Date Status...</option>
            <option value="Current">Current</option>
            <option value="Next">Next</option>
          </select>
        </div>
        <div className="flex flex-col h-fit w-full gap-2">
          <label className="ml-3 text-lg text-textBlack">Date-Day</label>
          <input
            value={dateday}
            onChange={(e) => setDateday(e.target.value)}
            className="p-3 shadow-sm bg-inputBG border-none"
            type="text"
            placeholder="Enter Date"
          />
        </div>
        <div className="flex flex-col h-fit w-full gap-2">
          <h4 className="ml-3 text-lg">Timeslot List</h4>
          <div className="grid grid-cols-5">
            {timeslotOptions.map((slot) => (
              <div
                key={slot}
                className="flex items-center p-1 m-1 text-center justify-center"
              >
                <input
                  type="checkbox"
                  value={slot}
                  checked={timeslots.includes(slot)}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 border border-gray-300 rounded bg-inputBG focus:ring-0"
                />
                <span className="ml-2 text-sm text-gray-500">{slot}</span>
              </div>
            ))}
          </div>
        </div>

        <Button props={"Add Timeslot & Date"} />

      </form>
    </div>
  );
};
export default Page;
