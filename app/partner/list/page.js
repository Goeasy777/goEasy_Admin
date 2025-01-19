"use client";
import LinkButton from "@/components/LinkButton";
import { partnerStatushandler } from "@/store/Actions/adminActions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { FaUserCircle, FaWallet } from "react-icons/fa";
import { MdClose, MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

const page = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const ShowNum = () => {
    return (
      <div className="flex flex-col gap-4" style={{}}>
        <select
          className="shadow-sm rounded-sm border-gray-300"
          value={limit}
          onChange={(e) => {
            setLimit(e.target.value);
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    );
  };

  const fetchPartner = async () => {
    // e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/partner/getpartner?limit=${limit}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Partner");
      }
      const data = await response.json();
      console.log(data.data);
      setData(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    }
  };

  // console.log(formattedDate);

  const SearchHandler = useCallback(async () => {
    if (search === "") {
      setSearchResults([]);
      fetchPartner();
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/partner/searchpartner/${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to search partner");
      }
      const result = await response.json();
      setSearchResults(result.data);
    } catch (err) {
      setError(err.message);
    }
  }, [search]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      SearchHandler();
    }, 200);
    return () => clearTimeout(debounce);
  }, [search, SearchHandler]);

  const handleDeleteClick = (id) => {
    console.log(id);

    setSelectedPartnerId(id);
    setShowModal(true);
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/partner/deletepartner/${selectedPartnerId}`
      );
      if (response.ok) {
        setShowModal(false); // Close the modal after successful deletion
        if (search) {
          setSearchResults((prevResults) =>
            prevResults.filter((partner) => partner._id !== selectedPartnerId)
          );
        } else {
          setData((prevData) =>
            prevData.filter((partner) => partner._id !== selectedPartnerId)
          );
        }
      }
    } catch (err) {
      console.error("Error deleting partner:", err.message);
    }
  };

  const handlePartnerStatus = async (approve, id) => {
    const formdata = new FormData();
    formdata.append("approve", approve);
    formdata.append("id", id);
    await dispatch(partnerStatushandler(formdata));
    fetchPartner();
  };

  useEffect(() => {
    fetchPartner();
  }, [limit, page]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const handleSelectChange = (event, partner) => {
    event.preventDefault();
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case "Info":
        setSelectedPartner(partner);
        setShowInfoCard(true);
        break;
      case "Wallet":
        router.push(`/partner/managepartner/${partner._id.toString()}`);
        break;
      case "Verification":
        router.push(`/partner/verification/${partner._id.toString()}`);
        break;
      case "Delete":
        handleDeleteClick(partner._id);
        break;
      default:
        router.push(`/partner/list`);
        break;
    }
    setSelectedOption((prev) => ({ ...prev, [partner._id]: "" }));
  };

  const closeInfoCard = () => {
    setShowInfoCard(false);
    setSelectedPartner(null);
  };

  const handlePageClick = (data) => {
    data.preventDefault();
    setPage(data.selected + 1);
  };

  return (
    <div className="h-full w-full flex flex-col  py-10 px-14 gap-10 bg-formBG rounded-md">
      <div className="py-4 px-8 flex justify-between items-center text-xl w-full border-none shadow-sm rounded-sm bg-headerBG">
        <h1>Partner List</h1>
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center px-6 w-full border-none shadow-sm bg-headerBG rounded-sm">
        <div className="py-3 flex items-center gap-2">
          <h1>Show Entries</h1>
          <ShowNum />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            SearchHandler();
          }}
        >
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            name="search"
            className="outline-none  border-gray-200 shadow-sm bg-white"
            placeholder="Search Customer..."
          />
          <button className="bg-searchBG p-2 text-textWhite" type="submit">
            Search
          </button>
        </form>
      </div>

      {showInfoCard && selectedPartner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-40">
          {/* Info Card */}
          <div className="h-[80%] min-w-[45%] bg-gray-100 p-6 shadow-xl z-50 rounded-md relative">
            {/* Title Section */}
            <div className="text-black text-center font-semibold rounded-md p-2 mb-1 ">
              <h3 className="text-lg font-bold opacity-70">
                Partner Information
              </h3>
            </div>

            {/* Close Button */}
            <button
              onClick={closeInfoCard}
              className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
              aria-label="Close"
            >
              <MdClose size={24} />
            </button>

            {/* User Info */}
            <div className="h-[95%] w-full grid grid-cols-[40%_60%] px-5 py-3 mt-3 gap-5">
              {/* left */}
              <div className="flex flex-col justify-between h-full w-full  p-2 ">
                <div className="flex flex-col gap-3">
                  {/* Profile Section */}
                  <div className="flex flex-col items-center gap-2 bg-white rounded-md shadow-sm py-3 ">
                    <div className="overflow-hidden p-2 flex justify-center items-center">
                      <img
                        className="h-[120px] w-[120px] rounded-full object-cover border-2 border-white"
                        src={
                          selectedPartner?.image?.url || "placeholder-image-url"
                        }
                        alt="Partner"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <h2 className="text-xl font-semibold flex flex-col items-center text-gray-800">
                        {selectedPartner.name}
                        <small className="text-sm">
                          {" "}
                          {selectedPartner.myReferralCode}
                        </small>
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <div className="flex flex-col gap-0">
                      <p className="text-base pl-1 opacity-80"> Mobile:</p>
                      <h2 className="text-lg "> {selectedPartner.mobile}</h2>
                    </div>
                    <div className="flex flex-col gap-0">
                      <p className="text-base pl-1 opacity-80">Email:</p>
                      <h2 className="text-lg "> {selectedPartner.email}</h2>
                    </div>
                    <div className="flex flex-col gap-0">
                      <p className="text-base pl-1 opacity-80">DOB:</p>
                      <h2 className="text-lg ">
                        {new Date(selectedPartner.dob).toLocaleDateString()}{" "}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="w-fit h-fit flex flex-row gap-3 items-center justify-center bg-green-400 rounded-sm py-2 px-4">
                  <FaWallet className="text-2xl text-white" />
                  <h2 className="text-2xl text-white">
                    Rs.{selectedPartner?.wallet?.balance}
                  </h2>
                </div>
              </div>

              {/*right*/}
              <div className="w-full p-3 grid grid-rows-3">
                {/* top */}
                <div className="text-center flex flex-col ">
                  <h1 className="text-xl mb-4">Profession</h1>
                  {selectedPartner.partnercategory.map((elem, index) => (
                    <div className="py-2 px-4 bg-white shadow-sm rounded-sm mb-2">
                      {elem.category}
                    </div>
                  ))}
                </div>
                {/* mid */}
                <div className="text-center flex flex-col ">
                  <h1 className="text-xl mb-4">Documents</h1>
                  <div className="flex flex-col gap-2 items-start">
                    <div className="text-lg w-full flex justify-between">
                      <h1>Profile</h1>
                      <span>
                        {selectedPartner?.image?.isApproved ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="text-lg w-full flex justify-between">
                      <h1>Aadhar Verified</h1>
                      <span>
                        {selectedPartner?.aadharDetails?.isApproved
                          ? "Yes"
                          : "No"}
                      </span>
                    </div>
                    <div className="text-lg w-full flex justify-between">
                      <h1> Pan Verified</h1>
                      <span>
                        {selectedPartner.panDetails?.isApproved ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
                {/* end */}
                <div className={`text-center flex flex-col  gap-2  h-fit `}>
                  <h1 className="text-xl mb-2">Status</h1>

                  {selectedPartner.status === "On" ? (
                    <div className="bg-green-500 shadow-sm rounded-sm px-3 py-2 text-center text-white">
                      On
                    </div>
                  ) : selectedPartner.status === "Off" ? (
                    <div className="bg-red-500 shadow-sm rounded-sm px-3 py-2 text-center text-white">
                      Off
                    </div>
                  ) : (
                    <div className="bg-orange-400 shadow-sm rounded-sm px-3 py-2 text-center text-white">
                      N/A
                    </div>
                  )}

                  {selectedPartner.approve === "Approved" ? (
                    <div className="bg-green-500 shadow-sm rounded-sm px-3 py-2 text-center text-white">
                      Approved
                    </div>
                  ) : (
                    <div className="bg-red-500 shadow-sm rounded-sm px-3 py-2 text-center text-white">
                      Disapproved
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Headers */}
      <div className="py-3 w-full grid grid-cols-[40px_1fr_1fr_1fr_80px_80px_110px_1fr]  opacity-70 border-b-[1px] border-gray-200">
        <h1 className="text-base text-center">No.</h1>
        <h1 className="text-base text-center">Full name</h1>
        <h1 className="text-base text-center">Email</h1>
        <h1 className="text-base text-center">Mobile</h1>
        <h1 className="text-base text-center">Wallet</h1>
        <h1 className="text-base text-center">Status</h1>
        <h1 className="text-base text-center">Profession</h1>
        <h1 className="text-base text-center">Action</h1>
      </div>

      {/* Display Error if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Search Results if search is active, otherwise display all cities */}
      <div>
        {search ? (
          searchResults.length ? (
            searchResults.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3 grid grid-cols-[40px_1fr_1fr_1fr_80px_80px_110px_1fr] border-b-[1px] border-gray-100"
              >
                <h1 className="text-base text-center">{index + 1}</h1>
                <h1 className="text-base text-center">{elem.name}</h1>
                <h1 className="text-base text-center">{elem.email}</h1>
                <h1 className="text-base text-center">{elem.mobile}</h1>
                <h1 className="text-base text-center">{elem.wallet.balance}</h1>
                <h1 className="text-base text-center">{elem.status}</h1>
                <h1 className=" text-center text-sm ">
                  {elem.approve === "Approved" ? (
                    <button
                      onClick={() => {
                        handlePartnerStatus("Disapproved", elem._id);
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handlePartnerStatus("Approved", elem._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Disapproved
                    </button>
                  )}
                </h1>

                <div
                  className="flex items-center justify-center gap-2 text-center" /*onClick={() => deleteHandler(elem._id)}*/
                >
                  {/* <MdDelete size={20} /> */}
                  <select
                    value={selectedOption[elem._id] || ""}
                    onChange={(e) => {
                      setSelectedOption((prev) => ({
                        ...prev,
                        [elem._id]: e.target.value,
                      }));
                      handleSelectChange(e, elem);
                    }}
                    className="w-2/3 text-sm outline-none border-none focus:ring-0 bg-gray-200"
                  >
                    <option value="">Select</option>
                    <option value="Info">Info</option>
                    <option value="Verification">Verification</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Delete">Delete</option>
                  </select>
                </div>

                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded shadow-sm w-96 z-50">
                      <h2 className="text-lg font-bold mb-4">
                        Confirm Deletion
                      </h2>
                      <p>Are you sure you want to delete this Partner?</p>
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
            ))
          ) : (
            <p>No partner found for "{search}".</p>
          )
        ) : data.length > 0 ? (
          <div>
            {data.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3 grid grid-cols-[40px_1fr_1fr_1fr_80px_80px_110px_1fr] border-b-[1px] border-gray-100"
              >
                <h1 className="text-base text-center">{index + 1}</h1>
                <h1 className="text-base text-center">{elem.name || "null"}</h1>
                <h1 className="text-base text-center ">
                  {elem.email || "null"}
                </h1>
                <h1 className="text-base text-center">
                  {elem.mobile || "null"}
                </h1>
                <h1 className="text-base text-center">
                  {elem.wallet?.balance}
                </h1>
                <h1 className="text-base text-center">
                  {elem.status || "null"}
                </h1>
                <h1 className="flex flex-col">
                  {elem.partnercategory.map((ele, index) => (
                    <h1 key={index} className="text-base text-center">
                      {ele.category || "null"}
                    </h1>
                  )) || "null"}
                </h1>
                {/* <h1 className=" text-center text-sm ">
                  {elem.approve === "Approved" ? (
                    <button
                      onClick={() => {
                        handlePartnerStatus("Disapproved", elem._id);
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handlePartnerStatus("Approved", elem._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Disapproved
                    </button>
                  )}
                </h1> */}

                <div
                  className="flex items-center justify-center gap-2 text-center" /*onClick={() => deleteHandler(elem._id)}*/
                >
                  {/* <MdDelete size={20} /> */}
                  <select
                    value={selectedOption[elem._id] || ""}
                    onChange={(e) => {
                      setSelectedOption((prev) => ({
                        ...prev,
                        [elem._id]: e.target.value,
                      }));
                      handleSelectChange(e, elem);
                    }}
                    className="w-2/3 text-sm outline-none border-none focus:ring-0 bg-gray-200"
                  >
                    <option value="">Select</option>
                    <option value="Info">Info</option>
                    <option value="Verification">Verification</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Delete">Delete</option>
                  </select>
                </div>

                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded shadow-sm w-96 z-50">
                      <h2 className="text-lg font-bold mb-4">
                        Confirm Deletion
                      </h2>
                      <p>Are you sure you want to delete this Partner?</p>
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

            <div className="mt-4">
              <ReactPaginate
                className="h-full w-full flex flex-wrap items-center justify-end pr-14 gap-4"
                previousLabel={"<"}
                nextLabel={" >"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                // Custom classes for previous and next buttons
                previousClassName="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                nextClassName="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                // Classes for the actual anchor tags inside previous/next buttons
                previousLinkClassName="hover:text-blue-500"
                nextLinkClassName="hover:text-blue-500"
                // activeClassName="bg-blue-500 text-white px-2 py-1 rounded"
                activeLinkClassName="bg-blue-500 text-white px-2 py-1 rounded"
              />
            </div>
          </div>
        ) : (
          <p>No partner found.</p>
        )}
      </div>
    </div>
  );
};

export default page;
