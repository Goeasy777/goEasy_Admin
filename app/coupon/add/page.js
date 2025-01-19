"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Button, ButtonGroup } from "@nextui-org/button"
import Button from "@/components/Button";
import { addCoupon } from "@/store/Actions/adminActions";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [couponcode, setCouponCode] = useState("");
  const [percentage, setPercentage] = useState("");
  const [maximumamount, setMaximumamount] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [expirydate, setExpiryDate] = useState("");
  const [showAlert, setShowAlert] = useState(false);


  const addCouponHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("couponcode", couponcode);
    formData.append("percentage", percentage);
    formData.append("maximumamount", maximumamount);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("expirydate", expirydate);

    try {
      const response = await dispatch(addCoupon(formData));;
      // console.log(response.success);
      console.log(response);

      if (response.data.success) {
        setShowAlert({
          type: "success",
          message: "Coupoun added successfully!",
        });
      } else {
        setShowAlert({
          type: "error",
          message: response.message || "Failed to add Coupoun.",
        });
      }

      setTimeout(() => setShowAlert(null), 3000);
      setTimeout(() => router.push("/coupon/list"), 3000);
    } catch (error) {
      console.error("Error during submission:", error);
      setShowAlert({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });

      setTimeout(() => setShowAlert(null), 3000);
    }
    setCouponCode("");
    setPercentage("");
    setMaximumamount("");
    setDescription("");
    setStatus("");
    setExpiryDate("");
  };

  return (
    <div className="h-full w-full flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md">
      <h1 className="py-4 px-6 text-xl w-full  border-none shadow-sm bg-headerBG rounded-sm">
        Add Coupon
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
        onSubmit={addCouponHandler}
        className="flex flex-col gap-8 items-start"
      >
        <div className="w-full grid grid-cols-2 gap-3">
          <div className="flex flex-col h-fit w-full gap-2">
            <h4 className="ml-3 text-lg">Coupon Code</h4>
            <input
              className="p-3 bg-inputBG border-none shadow-sm"
              type="text"
              name="couponcode"
              placeholder="Enter coupon code"
              value={couponcode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </div>

          <div className="flex flex-col h-fit w-full gap-2">
            <h4 className="ml-3 text-lg"> Percentage </h4>
            <input
              className="p-3 bg-inputBG border-none shadow-sm"
              type="number"
              name="percentage"
              placeholder="Enter percentage..."
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-3">
          <div className="flex flex-col h-fit w-full gap-2">
            <h4 className="ml-3 text-lg">Maxium Amount </h4>
            <input
              className="p-3 bg-inputBG border-none shadow-sm"
              type="number"
              name="maximumamount"
              placeholder="Enter maximum aount..."
              value={maximumamount}
              onChange={(e) => setMaximumamount(e.target.value)}
            />
          </div>

          <div className="flex flex-col h-fit w-full gap-2">
            <h4 className="ml-3 text-lg">Expiry Date</h4>
            <input
              className="p-3 bg-inputBG border-none shadow-sm"
              type="date"
              name="expirydate"
              placeholder="Enter expiry date..."
              value={expirydate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          {/* <div className="flex flex-col h-fit w-full gap-2">
            <h4 className="ml-3 text-lg">Expiry Date</h4>
            <input
              className="p-3 bg-inputBG border-none shadow-sm"
              type="text"
              name="expirydate"
              placeholder="Enter expiry date..."
              value={expirydate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div> */}
        </div>

        <div className="w-full grid grid-cols-2 gap-3">
          <div className="flex flex-col h-fit w-full gap-2">
            <h4 className="ml-3 text-lg">Status</h4>
            <select
              className="p-3 bg-inputBG border-none shadow-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select status...</option>
              <option value="Enable">Enable</option>
              <option value="Disable">Disable</option>
            </select>
          </div>

          <div className="flex flex-col h-fit w-full gap-2">
            <h4 className="ml-3 text-lg">Decription</h4>
            <input
              className="p-3 bg-inputBG border-none shadow-sm"
              type="text"
              name="description"
              placeholder="Enter decription..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <Button props={"Add Coupon"} />
      </form>
    </div>
  );
};

export default page;
