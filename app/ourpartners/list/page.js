"use client";
import LinkButton from "@/components/LinkButton";
import { useEffect, useState, useCallback } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const page = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedPartnerId, setSelectedPartnerId] = useState(null);

    const fetchOurPartner = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getourTrustedPartners`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }
            const data = await response.json();
            console.log(data.data);

            setData(data.data);
            // setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteClick = (id) => {
        setSelectedPartnerId(id);
        setShowModal(true);
    };

    const deleteHandler = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteOurTrustedPartners/${selectedPartnerId}`,
                { method: "GET" }
            );
            if (response.ok) {
                setShowModal(false);
                setData((prevData) =>
                    prevData.filter((client) => client._id !== selectedPartnerId)
                );
            } else {
                console.error("Failed to delete client");
            }
        } catch (err) {
            console.error("Error deleting our clients:", err.message);
        }
    };

    useEffect(() => {
        fetchOurPartner();
    }, []);

    return (
        <div className="h-full w-full flex flex-col  py-10 px-14 gap-10 bg-formBG rounded-md">
            {/* Heading */}

            <div className="py-3 px-8 flex justify-between items-center text-xl w-full border-none shadow-sm rounded-sm bg-headerBG">
                <h2 className="text-textBlack">Our Partner List</h2>
                <LinkButton url="/ourpartner/add" value="Add New Our Partner" />
            </div>

            <div className="py-3 text-textBlack w-full grid grid-cols-[40px_1fr_1fr_1fr_1fr]  opacity-70 border-b-[1px] border-none">
                <h1 className="text-base text-center">No.</h1>
                <h1 className="text-base text-center">Our Partner name</h1>
                <h1 className="text-base text-center">Our Partner Image</h1>
                <h1 className="text-base text-center">Status</h1>
                <h1 className="text-base text-center">Action</h1>
            </div>

            {/* Display Search Results if search is active, otherwise display all categories */}
            <div>
                {data && data.length > 0 ? (
                    <div>
                        {data.map((elem, index) => (
                            <div
                                key={index}
                                className="w-full py-3 text-textBlack items-center grid grid-cols-[40px_1fr_1fr_1fr_1fr] border-b-[1px] border-gray-100 "
                            >
                                <h1 className="text-base text-center">{index + 1}</h1>
                                <h1 className="text-base text-center">{elem.partnerName}</h1>
                                <div className="flex items-center justify-center">
                                    <img src={elem.image.url} alt="" height={70} width={100}
                                    />
                                </div>
                                <h1 className="text-base text-center ">{elem.status}</h1>

                                <div className="flex items-center justify-center gap-2 text-center">
                                    <MdDelete
                                        size={20}
                                        onClick={() => handleDeleteClick(elem._id)}
                                    />
                                </div>

                                {/* Confirmation Modal */}
                                {showModal && (
                                    <div className="fixed inset-0 flex items-center justify-center z-40">
                                        <div className="bg-white p-6 rounded shadow-sm w-96 z-50">
                                            <h2 className="text-lg font-bold mb-4">
                                                Confirm Deletion
                                            </h2>
                                            <p>Are you sure you want to delete this our partner?</p>
                                            <div className="flex justify-end gap-4 mt-6">
                                                <button
                                                    className="bg-gray-200 px-4 py-2 rounded"
                                                    onClick={() => setShowModal(false)} // Close modal without deleting
                                                >
                                                    No
                                                </button>
                                                <button
                                                    className="bg-buttonBG text-white px-4 py-2 rounded"
                                                    onClick={deleteHandler} // Confirm deletion
                                                >
                                                    Yes
                                                </button>
                                            </div>
                                        </div>
                                        {/* Modal Background Overlay */}
                                        <div className="fixed inset-0 bg-gray-700 opacity-10 z-40"></div>
                                    </div>
                                )}
                            </div>
                        ))}


                    </div>
                ) : (
                    <p>No our Partner found.</p>
                )}
            </div>
        </div>
    );
};

export default page;
