'use client'
import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import axios from 'axios';

const Page = () => {
    const [showAlert, setShowAlert] = useState(null);
    const [response1, setResponse1] = useState("");
    const [response2, setResponse2] = useState("");
    const [response3, setResponse3] = useState("");
    const [response4, setResponse4] = useState("");
    const [response5, setResponse5] = useState("");
    const [data, setData] = useState([]);

    const getPoints = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getCancelPoints`
            );
            if (!response.ok) throw new Error("Failed to fetch points");

            const result = await response.json();
            setData(result.data || []);
            setResponse1(result.data[0]?.point1 || "");
            setResponse2(result.data[0]?.point2 || "");
            setResponse3(result.data[0]?.point3 || "");
            setResponse4(result.data[0]?.point4 || "");
            setResponse5(result.data[0]?.point5 || "");
        } catch (error) {
            console.error("Error fetching points:", error);
        }
    };

    const updatePoints = async (e) => {
        e.preventDefault();
        const points = {
            point1: response1 || data[0]?.point1,
            point2: response2 || data[0]?.point2,
            point3: response3 || data[0]?.point3,
            point4: response4 || data[0]?.point4,
            point5: response5 || data[0]?.point5,
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/addOrUpdateCancelPoints`,
                points
            );

            if (response.data.success) {
                setShowAlert({ type: "success", message: "Updated successfully!" });
            } else {
                setShowAlert({ type: "error", message: response.data.message || "Failed to update." });
            }

            setTimeout(() => setShowAlert(null), 3000);
        } catch (error) {
            console.error("Error during update:", error);
            setShowAlert({ type: "error", message: error.message || "An unexpected error occurred." });
            setTimeout(() => setShowAlert(null), 3000);
        }
    };

    useEffect(() => {
        getPoints();
    }, []);

    return (
        <div className="h-full flex flex-col gap-5">
            <div className="relative h-fit w-full flex flex-col py-10 px-14 gap-6 bg-formBG rounded-md">
                <div className="py-3 px-8 flex justify-between items-center text-xl w-full border-none rounded-sm shadow-sm bg-headerBG">
                    <h1 className="text-textBlack">Cancel Responses</h1>
                </div>

                {showAlert && (
                    <Alert
                        className="absolute w-80 top-30 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        icon={<CheckIcon fontSize="inherit" />}
                        severity={showAlert.type}
                    >
                        {showAlert.message}
                    </Alert>
                )}

                <form onSubmit={updatePoints} className="flex flex-col gap-5">
                    <div className='grid grid-cols-2 gap-5 items-start'>
                        {[response1, response2, response3, response4, response5].map((response, index) => (
                            <div key={index} className="flex flex-col h-fit w-full gap-1">
                                <h4 className="ml-3 text-lg text-textBlack">Response {index + 1}</h4>
                                <input
                                    name={`point${index + 1}`}
                                    value={response}
                                    onChange={(e) => {
                                        const newResponses = [response1, response2, response3, response4, response5];
                                        newResponses[index] = e.target.value;
                                        [setResponse1, setResponse2, setResponse3, setResponse4, setResponse5][index](e.target.value);
                                    }}
                                    className="p-3 border-none bg-inputBG shadow-sm"
                                    type="text"
                                    placeholder={data[0]?.[`point${index + 1}`] || `Enter Point ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                    <Button props={"Update"} />
                </form>
            </div>
        </div>
    );
};

export default Page;
