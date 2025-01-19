"use client";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

import { AiFillCloseCircle } from "react-icons/ai";
import {
  partnerAadharApprove,
  partnerApprove,
  partnerPanApprove,
  partnerProfileApprove,
} from "@/store/Actions/partnerActions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const ImageModal = ({ isOpen, onClose, imageUrl, text }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed w-full h-full inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 gap-10 overflow-hidden">
      <div className="max-w-3xl relative flex justify-center items-center">
        <img
          src={imageUrl}
          alt="Large view"
          className="w-[350px] h-[300px] object-cover overflow-hidden"
          onClick={onClose}
        />
      </div>

      <h1 className="px-5 py-3 text-xl bg-white">
        {text}
      </h1>
    </div>
  );
};

const page = ({ params }) => {
  const { id } = params;
  const [userdata, setUserdata] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [no, setNo] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const fetchPartner = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/partner/getpartnerbyid/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Partner");
      }
      const data = await response.json();
      setUserdata(data.data);
    } catch (err) {
      console.error(err)
    }
  };

  const partnerAadharApproveHandler = async (isapprove, id) => {
    console.log(isapprove, id);
    await dispatch(partnerAadharApprove({ isapprove, id }));
    fetchPartner();
  };

  const partnerPanApproveHandler = async (isapprove, id) => {
    console.log(isapprove, id);
    await dispatch(partnerPanApprove({ isapprove, id }));
    fetchPartner();
  };

  const partnerProfileApproveHandler = async (isapprove, id) => {
    console.log(isapprove, id);
    await dispatch(partnerProfileApprove({ isapprove, id }));
    fetchPartner();
  };

  const approveHandler = async (isapprove, id) => {
    const response = await dispatch(partnerApprove({ isapprove, id }));
    if (response?.data?.approve === "Approved") {
      router.push("/partner/list");
    }
    fetchPartner();
  };

  useEffect(() => {
    fetchPartner();
  }, []);

  return (
    <div className="h-full w-full flex flex-col py-10 px-6 gap-10 rounded-md">

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={selectedImage}
        text={no}
      />

      <div className="flex items-center justify-start px-10 py-5 w-full bg-formBG rounded-md shadow-md">
        <div className="w-full flex items-center justify-start gap-5">
          <div className="flex flex-col gap-4 items-center">
            <img
              className="h-[150px] w-[150px] rounded-full object-cover border-2 border-white"
              src={userdata?.image?.url || "placeholder-image-url"}
              alt="Partner"
              onClick={() => {
                setSelectedImage(userdata?.image?.url);
                setIsModalOpen(true);
              }}
            />
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="flex items-center text-center">
                {userdata?.image?.isApproved === true ? (
                  <span className="text-green-500 font-semibold text-sm">
                    Approved
                  </span>
                ) : (
                  <span className="text-red-500 font-semibold text-sm">
                    Not Approved
                  </span>
                )}
              </div>
              <FaCheckCircle
                className="text-green-500 text-[20px]"
                onClick={() => {
                  partnerProfileApproveHandler(true, userdata._id);
                }}
              />
              <AiFillCloseCircle
                className="text-red-500 text-[22px]"
                onClick={() => {
                  partnerProfileApproveHandler(false, userdata._id);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold text-gray-800">
              {userdata?.name}
            </h2>
            <span className="text-2xl flex flex-row gap-2">
              {userdata?.partnercategory?.map((elem, index) => (
                <div className="">
                  {elem?.category}
                  {/* {", "} */}
                  {userdata?.partnercategory?.length > 1 ? "," : ""}
                </div>
              ))}
            </span>
            <p className="text-md text-gray-500">
              {userdata?.city?.city}, India
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-formBG p-5 rounded-md shadow-md">
        <div className="flex items-center justify-between px-10 py-5 w-full bg-gray-50 shadow-sm rounded-sm">
          <div className="grid grid-cols-[1fr_1fr_40%_15%_10%] items-center w-full">
            <h2 className="text-center">Aadhar Card </h2>
            <h2 className="text-center flex flex-col">
              <span className="text-sm"> Aadhar no.</span>
              {userdata?.aadharDetails?.aadharNumber}{" "}
            </h2>
            <div className="flex flex-row justify-center items-center gap-4">
              <img
                className="h-24 w-32 object-fill"
                src={userdata?.aadharDetails?.aadharImages?.front?.url}
                alt=""
                onClick={() => {
                  setSelectedImage(
                    userdata?.aadharDetails?.aadharImages?.front?.url);
                  setNo(userdata?.aadharDetails?.aadharNumber)
                  setIsModalOpen(true);
                }}
              />
              <img
                className="h-24 w-32 object-fill"
                src={userdata?.aadharDetails?.aadharImages?.back?.url}
                alt=""
                onClick={() => {
                  setSelectedImage(
                    userdata?.aadharDetails?.aadharImages?.back?.url
                  );
                  setNo(userdata?.aadharDetails?.aadharNumber)
                  setIsModalOpen(true);
                }}
              />
            </div>
            <div className="flex items-center text-center">
              {userdata?.aadharDetails?.isApproved === true ? (
                <span className="text-green-500 font-semibold">Approved</span>
              ) : (
                <span className="text-red-500 font-semibold">Not Approved</span>
              )}
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <FaCheckCircle
                className="text-green-500 text-[28px]"
                onClick={() => {
                  partnerAadharApproveHandler(true, userdata._id);
                }}
              />
              <AiFillCloseCircle
                className="text-red-500 text-[30px]"
                onClick={() => {
                  partnerAadharApproveHandler(false, userdata._id);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-10 py-5 w-full bg-gray-50 shadow-sm rounded-sm">
          <div className="grid grid-cols-[1fr_1fr_40%_15%_10%] items-center  w-full">
            <h2 className="text-center">Pan Card </h2>
            <h2 className="text-center flex flex-col">
              <span className="text-sm"> Pan no.</span>
              {userdata?.panDetails?.panNumber}{" "}
            </h2>
            <div className="flex flex-row justify-center items-center gap-4">
              <img
                className="h-24 w-32 object-fill"
                src={userdata?.panDetails?.panImage?.url}
                alt=""
                onClick={() => {
                  setSelectedImage(userdata?.panDetails?.panImage?.url);
                  setNo(userdata?.panDetails?.panNumber)
                  setIsModalOpen(true);
                }}
              />
            </div>
            <div className="flex items-center text-center">
              {userdata?.panDetails?.isApproved === true ? (
                <span className="text-green-500 font-semibold">Approved</span>
              ) : (
                <span className="text-red-500 font-semibold">Not Approved</span>
              )}
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="flex flex-row items-center justify-center gap-2">
                <FaCheckCircle
                  className="text-green-500 text-[28px]"
                  onClick={() => {
                    partnerPanApproveHandler(true, userdata._id);
                  }}
                />
                <AiFillCloseCircle
                  className="text-red-500 text-[30px]"
                  onClick={() => {
                    partnerPanApproveHandler(false, userdata._id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-10 py-5 w-full bg-formBG rounded-md shadow-md ">
        {userdata?.aadharDetails?.isApproved === true &&
          userdata?.panDetails?.isApproved === true &&
          userdata?.image?.isApproved === true ? (
          <div className="w-full  flex items-center justify-between">
            {userdata?.approve === "Approved" ? (
              <h1 className="text-green-500">Your Partner has Approved</h1>
            ) : (
              <h1 className="text-red-500">Your Partner has not Approved</h1>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  approveHandler("Approved", userdata._id);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  approveHandler("Disapproved", userdata._id);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Disapprove
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full  flex items-center justify-between">
            {userdata?.approve === "Approved" ? (
              <h1 className="text-green-500">Your Partner has Approved</h1>
            ) : (
              <h1 className="text-red-500">Your Partner has not Approved</h1>
            )}
            <button
              onClick={() => {
                approveHandler("Disapproved", userdata._id);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Disapprove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
