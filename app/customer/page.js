"use client";
import LinkButton from "@/components/LinkButton";
import { userStatushandler } from "@/store/Actions/adminActions";
// import { userStatushandler } from '@/store/Actions/adminActions';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { FaUserCircle, FaWallet } from "react-icons/fa";
import { MdEditSquare, MdDelete, MdClose } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

const ServiceList = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getUser?limit=${limit}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch customer");
      }
      const data = await response.json();
      console.log(data.data);
      setData(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    }
  };

  const SearchHandler = useCallback(async () => {
    if (search === "") {
      setSearchResults([]);
      fetchUser();
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/searchuser/${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to search customer");
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

    setSelectedUserId(id);
    setShowModal(true);
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteUser/${selectedUserId}`
      );
      if (response.ok) {
        setShowModal(false); // Close the modal after successful deletion
        if (search) {
          setSearchResults((prevResults) =>
            prevResults.filter((city) => city._id !== selectedUserId)
          );
        } else {
          setData((prevData) =>
            prevData.filter((city) => city._id !== selectedUserId)
          );
        }
      }
    } catch (err) {
      console.error("Error deleting city:", err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [limit, page]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };



  const handleSelectChange = (event, user) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case "Info":
        setSelectedUser(user);
        setShowInfoCard(true);
        break;
      case "Wallet":
        router.push(`/customer/manageuser/${user._id.toString()}`);
        break;
      case "Order":
        router.push(`/customer/order/${user._id.toString()}`);
        break;
      case "Delete":
        // deleteHandler(user._id);
        handleDeleteClick(user._id);
        break;
      default:
        router.push(`/customer/list`);
        break;
    }
    setSelectedOption((prev) => ({ ...prev, [user._id]: "" }));
  };

  const closeInfoCard = () => {
    setShowInfoCard(false);
    setSelectedUser(null);
  };

  const handleUserStatus = async (status, id) => {
    const formdata = new FormData();
    formdata.append("status", status);
    formdata.append("id", id);
    await dispatch(userStatushandler(formdata));
    fetchUser();
  };

  return (
    <div className="h-full w-full flex flex-col  py-10 px-14 gap-10 bg-formBG rounded-md">
      <div className="py-4 px-8 flex justify-between text-xl items-center w-full border-none rounded-sm shadow-sm bg-headerBG">
        <h4>Customer List</h4>
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center px-6 w-full border-none shadow-sm rounded-sm bg-headerBG">
        <div className="py-3 flex items-center gap-2 ">
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
            className="outline-none  border-gray-200 shadow-sm"
            placeholder="Search Customer..."
          />
          <button className="bg-searchBG p-2 text-textWhite" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* User Info Card */}
      {showInfoCard && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-40">
          {/* Info Card */}
          <div className="h-[85%] min-w-[60%] bg-gray-100 p-6 shadow-xl z-50 rounded-md relative">
            {/* Title Section */}
            <div className="text-black text-center font-semibold rounded-md p-2 mb-1 ">
              <h3 className="text-lg font-bold opacity-70">User Information</h3>
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
            <div className="h-[95%] w-full flex flex-row px-5 py-3 mt-3 gap-5">
              {/* left */}
              <div className="flex flex-col w-1/4 justify-between h-full p-3 ">
                <div className="flex flex-col gap-6">
                  {/* Profile Section */}
                  <div className="flex flex-col items-center gap-2 bg-white rounded-md shadow-sm py-6 ">
                    <div className="h-[120px] w-[120px] rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={selectedUser.image.url}
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col gap-1 text-center">
                      <h2 className="text-xl font-semibold flex flex-col items-center text-gray-800">
                        {selectedUser.name}
                        <small className="text-sm">
                          {" "}
                          {selectedUser.myReferralCode}
                        </small>
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-col items-start  gap-4">
                    <div className="flex flex-col gap-0">
                      <p className="text-base pl-1 opacity-80"> Mobile:</p>
                      <h2 className="text-lg "> {selectedUser.mobile}</h2>
                    </div>
                    <div className="flex flex-col gap-0">
                      <p className="text-base pl-1 opacity-80">Email:</p>
                      <h2 className="text-lg "> {selectedUser.email}</h2>
                    </div>
                    <div className="flex flex-col gap-0">
                      <p className="text-base pl-1 opacity-80">Status:</p>
                      <h2 className="text-lg "> {selectedUser.status}</h2>
                    </div>
                  </div>
                </div>

                <div className="w-fit h-fit flex flex-row gap-3 items-center justify-center bg-green-400 rounded-sm py-2 px-4">
                  <FaWallet className="text-2xl text-white" />
                  <h2 className="text-2xl text-white">
                    Rs.{selectedUser?.wallet?.balance}
                  </h2>
                </div>
              </div>

              {/* right */}
              <div className={`grid grid-cols-2 w-3/4 gap-3 p-1 overflow-y-auto h-[90%]`}>
                {selectedUser.address.map((elem, index) => (
                  <div
                    key={index}
                    className={`w-full h-fit bg-white p-4 rounded-md shadow-sm `}
                  >
                    <p className="text-lg font-semibold mb-5">Address {index + 1}:</p>
                    <p className="py-1 px-2 rounded-sm bg-green-500 w-fit text-white text-sm mb-3">
                      {elem.addressType || ""}
                    </p>
                    <div className="text-base text-gray-600 pl-1 mb-5">
                      <p>{elem.addressLine1 || ""},</p>
                      <p>{elem.landmark || ""},</p>
                      <p>{elem.city || ""},</p>
                      <p className="font-bold">
                        {elem.name || ""}
                      </p>
                      <p className="font-bold">
                        {elem.mobile || ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Headers */}
      <div className="py-3 w-full grid grid-cols-[40px_12vw_12vw_150px_1fr_150px_150px]  opacity-70 border-b-[1px] border-gray-200">
        <h1 className="text-base text-center">No.</h1>
        <h1 className="text-base text-center">Full Name</h1>
        <h1 className="text-base text-center">Email</h1>
        <h1 className="text-base text-center">Mobile</h1>
        <h1 className="text-base text-center">Wallet</h1>
        <h1 className="text-base text-center">Status</h1>
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
                className="w-full py-3 grid grid-cols-[40px_12vw_12vw_150px_1fr_150px_150px] border-b-[1px] border-gray-100"
              >
                <h1 className="text-base text-center ">{index + 1}</h1>
                <h1 className="text-base text-center ">{elem.name}</h1>
                <h1 className="text-base text-center ">{elem.email}</h1>
                <h1 className="text-base text-center ">{elem.mobile}</h1>
                <h1 className="text-base text-center ">
                  {elem.wallet.balance}
                </h1>
                <h1 className=" text-center text-sm ">
                  {elem.status === "Active" ? (
                    <button
                      onClick={() => {
                        handleUserStatus("Deactive", elem._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Make Deactive
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleUserStatus("Active", elem._id);
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Make Active
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
                    <option value="Order">Order</option>
                    <option value="Wallet">manage user</option>
                    <option value="Delete">Delete</option>
                  </select>
                </div>
                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded shadow-sm w-96 z-50">
                      <h2 className="text-lg font-bold mb-4">
                        Confirm Deletion
                      </h2>
                      <p>Are you sure you want to delete this User?</p>
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
            <p>No customer found for "{search}".</p>
          )
        ) : data.length > 0 ? (
          <div>
            {data.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3 grid grid-cols-[40px_12vw_12vw_150px_1fr_150px_150px] items-center border-b-[1px] border-gray-100"
              >
                <h1 className="text-base text-center">{index + 1}</h1>
                <h1 className="text-base text-center ">{elem.name}</h1>
                <h1 className="text-base text-center break-words max-w-full ">
                  {elem.email}
                </h1>
                <h1 className="text-base text-center ">{elem.mobile}</h1>
                <h1 className="text-base text-center ">
                  {elem.wallet.balance}
                </h1>
                <h1 className=" text-center text-sm ">
                  {elem.status === "Active" ? (
                    <button
                      onClick={() => {
                        handleUserStatus("Deactive", elem._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Make Deactive
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleUserStatus("Active", elem._id);
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Make Active
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
                    <option value="Order">Order</option>
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
                      <p>Are you sure you want to delete this user?</p>
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
          <p>No Customer found.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
