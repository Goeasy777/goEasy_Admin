"use client";
import LinkButton from "@/components/LinkButton";
import { searchcity } from "@/store/Actions/adminActions";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { MdEditSquare, MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

const page = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  // const [deleted, setDelete] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  // const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedCityId, setSelectedCityId] = useState(null); // State to track selected city ID

  // Show the modal and set the selected city ID when delete is clicked

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getCity?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      setData(data.data);
      setTotalPages(data.totalPages);
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/searchCity/${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to search cities");
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

    setSelectedCityId(id);
    setShowModal(true);
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteCity/${selectedCityId}`
      );
      if (response.ok) {
        setShowModal(false); // Close the modal after successful deletion
        if (search) {
          setSearchResults((prevResults) =>
            prevResults.filter((city) => city._id !== selectedCityId)
          );
        } else {
          setData((prevData) =>
            prevData.filter((city) => city._id !== selectedCityId)
          );
        }
      }
    } catch (err) {
      console.error("Error deleting city:", err.message);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [limit, page]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const ShowNum = () => {
    return (
      <div className="flex flex-col gap-2 bg-white rounded-md">
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

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <div className="h-full w-full flex flex-col  py-10 px-14 gap-10 bg-formBG rounded-md">
      <div className="py-3 px-8 flex justify-between items-center text-xl w-full border-none rounded-sm bg-headerBG shadow-sm">
        <h1 className="text-textBlack">City List</h1>

        <LinkButton url="/city/add" value="Add New City" />
      </div>

      <div className="flex justify-between items-center px-6 w-full border-none rounded-sm bg-headerBG shadow-sm">
        <div className="py-3 flex items-center gap-2  border-none rounded-sm">
          <h1 className="text-textBlack">Show Entries</h1>
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
            placeholder="Search City..."
          />
          <button className="bg-searchBG p-2 text-textWhite" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="h-full w-full flex flex-col gap-5">
        {/* Table Headers */}
        <div className=" py-3 flex items-center justify-between opacity-70 border-b-[1px] border-gray-200 ">
          <h1 className="text-base text-textBlack text-center w-1/4">No.</h1>
          <h1 className="text-base text-textBlack text-center w-1/4">City</h1>
          <h1 className="text-base text-textBlack text-center w-1/4">
            City Status
          </h1>
          <h1 className="text-base text-textBlack text-center w-1/4">Action</h1>
        </div>

        {/* Display Search Results if search is active, otherwise display all cities */}
        <div>
          {search ? (
            searchResults.length ? (
              searchResults.map((elem, index) => (
                <div
                  key={index}
                  className="w-full py-3 flex items-center justify-between border-b-[1px] text-textBlack border-gray-100 "
                >
                  <h1 className="text-base  text-center w-1/4">{index + 1}</h1>
                  <h1 className="text-base  text-center w-1/4">{elem.city}</h1>
                  <h1 className="text-base  text-center w-1/4">
                    {elem.status}
                  </h1>
                  <div className="flex items-center justify-center gap-2 w-1/4 text-center">
                    <Link href={`/city/edit/${elem._id}`}>
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
                        <p>Are you sure you want to delete this city?</p>
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
              <p>No cities found for "{search}".</p>
            )
          ) : data.length > 0 ? (
            <div>
              {data.map((elem, index) => (
                <div
                  key={index}
                  className="w-full py-3 flex items-center text-textBlack justify-between border-b-[1px] border-gray-100 "
                >
                  <h1 className="text-base  text-center w-1/4">{index + 1}</h1>
                  <h1 className="text-base  text-center w-1/4">{elem.city}</h1>
                  <h1 className="text-base  text-center w-1/4">
                    {elem.status}
                  </h1>
                  <div className="flex items-center justify-center gap-2 w-1/4 text-center">
                    <Link href={`/city/edit/${elem._id}`}>
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
                        <p>Are you sure you want to delete this city?</p>
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

              <div className="w-full items-center justify-end mt-4 ">
                <ReactPaginate
                  className="h-full w-full flex flex-wrap items-center justify-end gap-4 pr-14"
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
                  // activeClassName="bg-blue-500 text-white px-3 py-2 rounded"
                  activeLinkClassName="bg-blue-500 text-white px-2 py-1 rounded"
                />
              </div>
            </div>
          ) : (
            <p>No cities found.</p>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default page;
