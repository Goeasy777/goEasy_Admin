"use client";
import LinkButton from "@/components/LinkButton";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import ReactPaginate from "react-paginate";

const page = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedTimeId, setSelectedTimeId] = useState(null);

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

  const fetchTimeSlot = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getTime?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch time and slot");
      }

      const resdata = await response.json();
      console.log(resdata.data, "dcbbfdhdhdhc");

      setData(resdata.data);
      setTotalPages(resdata.totalPages);

      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const SearchHandler = useCallback(async () => {
    if (search === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/searchtime/${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to search time and slot");
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
    setSelectedTimeId(id);
    setShowModal(true);
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteTime/${selectedTimeId}`
      );
      if (response.ok) {
        setShowModal(false); // Close the modal after successful deletion
        if (search) {
          setSearchResults((prevResults) =>
            prevResults.filter((time) => time._id !== selectedTimeId)
          );
        } else {
          setData((prevData) =>
            prevData.filter((time) => time._id !== selectedTimeId)
          );
        }
      }
    } catch (err) {
      console.error("Error deleting subcategory:", err.message);
    }
  };

  useEffect(() => {
    fetchTimeSlot();
  }, [limit, page]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const handleChange = (event, index) => {
    const selectedTime = event.target.value;
    console.log(`Selected time for item at index ${index}: ${selectedTime}`);

    const updatedData = [...data];
    updatedData[index].selectedTime = selectedTime;
    setData(updatedData);
  };

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <div className="h-full w-full flex flex-col  py-10 px-14 gap-10 rounded-md bg-formBG">
      <div className="py-3 px-8 flex justify-between items-center text-xl w-full border-none shadow-sm bg-inputBG">
        <h1 className="text-textBlack">Time & Date List</h1>

        <LinkButton url="/timeslot/add" value="Add New Timeslot & Date" />
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center px-6 w-full  border-none shadow-sm bg-inputBG">
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
            placeholder="Search time&slot..."
          />
          <button className="bg-searchBG p-2 text-textWhite" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* Table Headers */}
      <div className="py-3 w-full grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] opacity-70 border-b-[1px] border-none text-textBlack">
        <h1 className="text-base text-center">No.</h1>
        <h1 className="text-base text-center">Category</h1>
        <h1 className="text-base text-center">Current or Next?</h1>
        <h1 className="text-base text-center">Added Days</h1>
        <h1 className="text-base text-center">Selected Slots</h1>
        <h1 className="text-base text-center">Action</h1>
      </div>

      {/* Display Error if any */}
      {/* {error && <p className='text-red-500'>{error}</p>} */}

      {/* Display Search Results if search is active, otherwise display all cities */}
      <div>
        {search ? (
          searchResults.length ? (
            searchResults.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3 grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] border-b-[1px] border-gray-100 text-textBlack"
              >
                <h1 className="text-base text-center">{index + 1}</h1>
                <h1 className="text-base text-center">
                  {/* {categories[elem.category] || "Loading..."} */}
                  {elem.category.category}
                </h1>
                <h1 className="text-base text-center">{elem.nextdate}</h1>
                <h1 className="text-base text-center">{elem.dateday}</h1>

                <select
                  id={`time-dropdown-${index}`}
                  onChange={(e) => handleChange(e, index)}
                  className="w-2/3 ml-10  flex items-center justify-center border-none outline-none focus:border-none focus:ring-0"
                >
                  <option value="">Time</option>

                  {Array.isArray(elem.timeslotlist) &&
                    elem.timeslotlist.map((timeslot) => (
                      // const parsedTimes = JSON.parse(timeslot);

                      <option
                        key={timeslot}
                        value={timeslot}
                        className="select-none"
                      >
                        {timeslot}
                      </option>
                    ))}
                </select>

                <div className="flex items-center justify-center gap-2 text-center">
                  <Link href={`/timeslot/edit/${elem._id}`}>
                    <MdEdit size={20} />
                  </Link>
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
                      <p>Are you sure you want to delete this Time?</p>
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
            <p>No timelot found for "{search}".</p>
          )
        ) : data.length > 0 ? (
          <div>
            {data.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3 grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] border-b-[1px] items-center justify-center border-gray-100 text-textBlack"
              >
                <h1 className="text-base text-center">{index + 1}</h1>
                <h1 className="text-base text-center">
                  {/* {categories[elem.category] || "Loading..."} */}
                  {elem.category.category}
                </h1>
                <h1 className="text-base text-center">{elem.nextdate}</h1>
                <h1 className="text-base text-center">{elem.dateday}</h1>

                <select
                  id={`time-dropdown-${index}`}
                  onChange={(e) => handleChange(e, index)}
                  className="w-2/3 ml-10  flex items-center justify-center border-none outline-none focus:border-none focus:ring-0"
                >
                  <option value="">Time</option>

                  {Array.isArray(elem.timeslotlist) &&
                    elem.timeslotlist.map((timeslot) => (
                      // const parsedTimes = JSON.parse(timeslot);

                      <option
                        key={timeslot}
                        value={timeslot}
                        className="select-none"
                      >
                        {timeslot}
                      </option>
                    ))}
                </select>

                <div className="flex items-center justify-center gap-2 text-center">
                  <Link href={`/timeslot/edit/${elem._id}`}>
                    <MdEdit size={20} />
                  </Link>
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
                      <p>Are you sure you want to delete this Time?</p>
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
          <p>No timeslot found.</p>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default page;
