"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { addourpartners } from "@/store/Actions/adminActions";

const page = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [partnerName, setPartnerName] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const addOurPartnerHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("partnerName", partnerName);
        formData.append("status", status);
        formData.append("image", image); // Appen
        try {
            const response = await dispatch(addourpartners(formData));
            console.log(response.success);

            if (response.success) {
                setShowAlert({
                    type: "success",
                    message: "Our Partner added successfully!",
                });
            } else {
                setShowAlert({
                    type: "error",
                    message: response.message || "Failed to add our partner.",
                });
            }

            setTimeout(() => setShowAlert(null), 3000);
            setTimeout(() => router.push("/ourpartners/list"), 3000);
        } catch (error) {
            console.error("Error during submission:", error);
            setShowAlert({
                type: "error",
                message: error.message || "An unexpected error occurred.",
            });

            setTimeout(() => setShowAlert(null), 3000);
        }
        setPartnerName("");
        setStatus("");
        setImage("");
    };

    return (
        <div className="h-fit w-full flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md">
            <h1 className="py-4 px-6 text-xl w-full border-[1px] rounded-md outline-none border-none shadow-sm bg-headerBG text-textBlack">
                Add Our Partner
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
                onSubmit={addOurPartnerHandler}
                className="flex flex-col gap-8 items-start"
                encType="multipart/form-data"
            >
                <div className="flex flex-col h-fit w-full gap-2">
                    <h4 className="ml-3 text-lg text-textBlack">Our Partner Name</h4>
                    <input
                        className="p-3 rounded-sm outline-none border-none shadow-sm bg-inputBG"
                        type="text"
                        placeholder="Enter our partner name..."
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                    />
                </div>

                <div className=" w-full flex items-center justify-center gap-3">
                    <div className="flex flex-col h-fit w-full gap-2">
                        <label htmlFor="image" className="ml-3 text-lg text-textBlack">
                            Our Partner Image
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

                    <div className="flex flex-col h-fit w-full gap-2">
                        <h4 className="ml-3 text-lg text-textBlack">Partner Status</h4>
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
                </div>

                <Button props={"Add Our Partner"} />
            </form>
        </div>
    );
};

export default page;
