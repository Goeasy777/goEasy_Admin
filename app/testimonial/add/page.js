"use client";
import Button from "@/components/Button";
import { addTestimonials } from "@/store/Actions/adminActions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/navigation";

const page = () => {
  const [name, setName] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState("")
  const [showAlert, setShowAlert] = useState(false);


  const dispatch = useDispatch();
  const router = useRouter();


  const addTestimonialsHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("paragraph", paragraph);
    formData.append("status", status);
    formData.append("image", image);
    formData.append("rating", rating)

    try {
      const response = await dispatch(addTestimonials(formData));
      console.log(response);
      if (response.success) {
        setShowAlert({
          type: "success",
          message: "Testimonials added successfully!",
        });
      } else {
        setShowAlert({
          type: "error",
          message: response.message || "Failed to add Testimonials.",
        });
      }
      setTimeout(() => setShowAlert(null), 3000);
      setTimeout(() => router.push("/testimonial/list"), 3000);
    } catch (error) {
      console.error("Error during submission:", error);
      setShowAlert({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(null), 3000);
    }


    setName("");
    setParagraph("");
    setStatus("");
    setImage(null);
    setRating("")
  };

  const Status = ({ status, setStatus }) => {
    return (
      <div className="flex flex-col h-fit w-full gap-2">
        <h4 className="ml-3 text-lg">Status</h4>
        <select
          className="p-3 border-none bg-inputBG border-gray-200 shadow-sm"
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
    <div className="flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md">
      <h1 className="py-4 px-6 text-xl w-full border-none rounded-sm shadow-sm bg-headerBG">
        Add Testimonials
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
        className="flex flex-col gap-8 items-startF"
        onSubmit={addTestimonialsHandler}
      >

        <div className=" w-full flex items-center justify-center gap-3">

          <div className="flex flex-col h-fit w-full gap-2">
            <h4 className="ml-3 text-lg">Name</h4>
            <input
              type="text"
              className="p-3 border-none bg-inputBG border-gray-200 shadow-sm"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>

          <div className="flex flex-col h-fit w-full gap-2">
            <h4 className="ml-3 text-lg">Rating</h4>
            <input
              type="number"
              className="p-3 border-none bg-inputBG border-gray-200 shadow-sm"
              value={rating}
              name="rating"
              onChange={(e) => setRating(e.target.value)}
              placeholder="Enter Rating"
            />
          </div>

        </div>

        <div className="flex flex-col h-fit w-full gap-2">
          <h4 className="ml-3 text-lg">Paragraph</h4>
          <input
            type="text"
            className="p-3 border-none bg-inputBG border-gray-200 shadow-sm"
            value={paragraph}
            name="paragraph"
            onChange={(e) => setParagraph(e.target.value)}
            placeholder="Enter Paragraph"
          />
        </div>

        <div className=" w-full flex items-center justify-center gap-3">

          <div className="flex flex-col h-fit w-full gap-2">
            <label htmlFor="image" className="ml-3 text-lg text-textBlack">
              Image
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

          <Status status={status} setStatus={setStatus} />
        </div>



        {/* <button type="submit" className='mt-5 bg-[black] outline-none text-white py-3 px-6 text-base rounded-md'>Add Banner</button> */}
        <Button props={"Add Testimonials"} />
      </form>
    </div>
  );
};

export default page;
