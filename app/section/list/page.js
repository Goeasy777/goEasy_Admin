"use client";
import LinkButton from "@/components/LinkButton";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { MdEditSquare, MdDelete, MdEdit } from "react-icons/md";
import ReactPaginate from "react-paginate";

const page = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState({});
  // const dispatch = useDispatch();


  const [showModal, setShowModal] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState({});

  const fetchAdsection = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getOfferSectionR?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch banners");
      }
      const data = await response.json();
      setData(data.data);
      setTotalPages(data.totalPages);

    } catch (error) { }
  };

  const handleDeleteClick = (id, childId) => {
    setSelectedOfferId({ id, childId });
    setShowModal(true);
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteOfferSectionR/${selectedOfferId.id}/${selectedOfferId.childId}`
      );
      if (response.ok) {
        setShowModal(false); // Close the modal after successful deletion
        if (search) {
          setSearchResults((prevResults) =>
            prevResults.filter(
              (offersection) => offersection._id !== selectedOfferId
            )
          );
        } else {
          setData((prevData) =>
            prevData.filter(
              (offersection) => offersection._id !== selectedOfferId
            )
          );
        }
      }
    } catch (err) {
      console.error("Error deleting offer section:", err.message);
    }
  };

  const SearchHandler = useCallback(async () => {
    if (search === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/searchOfferSection/${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to search offer section");
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

  useEffect(() => {
    fetchAdsection();
  }, [limit, page]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const ShowNum = () => {
    return (
      <div className="flex flex-col gap-4">
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
    <div className="h-full w-full flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md ">
      <div className="py-3 px-8 flex justify-between items-center text-xl w-full border-none rounded-sm shadow-sm bg-headerBG">
        <h4>Offer Section List</h4>
        <LinkButton url="/section/add" value="Add New Offer Section" />
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center px-6 w-full border-none rounded-sm shadow-sm bg-headerBG">
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
            placeholder="Search offer section..."
          />
          <button className="bg-searchBG p-2 text-textWhite" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* Table Headers */}
      <div className="py-3 w-full grid grid-cols-[40px_1fr_150px_1fr_1fr_1fr_1fr_80px_70px]  opacity-70 border-b-[1px] border-gray-200">
        <h1 className="text-base text-center">No.</h1>
        <h1 className="text-base text-center ">Offer title</h1>
        <h1 className="text-base text-center">Offer Image</h1>
        <h1 className="text-base text-center">Category</h1>
        <h1 className="text-base text-center">Subcategory</h1>
        <h1 className="text-base text-center">Childcategory</h1>
        <h1 className="text-base text-center">Offer Price</h1>
        <h1 className="text-base text-center">Status</h1>
        <h1 className="text-base text-center">Action</h1>
      </div>

      {/* Display Error if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Search Results if search is active, otherwise display all ad section */}
      <div>
        {search ? (
          searchResults.length > 0 ? (
            <div>
              {searchResults.map((elem, parentIndex) => {
                // Calculate the starting index for the current parent
                const parentOffset = searchResults
                  .slice(0, parentIndex)
                  .reduce((acc, curr) => acc + curr.child.length, 0);

                return (
                  <div key={parentIndex} className="w-full">
                    {elem.child.map((childElem, childIndex) => {
                      // Calculate the global index
                      const globalIndex = parentOffset + childIndex + 1;

                      return (
                        <div
                          key={`${parentIndex}-${childIndex}`}
                          className="w-full py-3 grid grid-cols-[40px_1fr_150px_1fr_1fr_1fr_1fr_80px_70px] items-center border-b-[1px] border-gray-100"
                        >
                          <h1 className="text-base text-center">
                            {globalIndex}
                          </h1>

                          <h1 className="text-base text-center">
                            {childElem.title}
                          </h1>

                          <div className="h-full w-full flex items-center justify-center">
                            <img
                              src={childElem.image.url}
                              alt=""
                              height={70} width={100}
                            />
                          </div>

                          <h1 className="text-base text-center">
                            {elem.category.category}
                          </h1>

                          <h1 className="text-base text-center">
                            {childElem.subcategory.subcategory}
                          </h1>

                          <h1 className="text-base text-center">
                            {childElem.childcategory?.childcategory || "N/A"}
                          </h1>

                          <h1 className="text-base text-center">
                            {childElem.childcategory?.childcategory?.price || 'N/A'}
                          </h1>

                          <h1 className="text-base text-center">
                            {elem.status}
                          </h1>

                          <div className="flex items-center justify-center gap-2 text-center">
                            <Link href={`/section/edit/${childElem._id}`}>
                              <MdEdit size={20} />
                            </Link>
                            <MdDelete
                              size={20}
                              onClick={() =>
                                handleDeleteClick(elem.id, childElem._id)
                              }
                            />
                          </div>

                          {/* Confirmation Modal */}
                          {showModal && (
                            <div className="fixed inset-0 flex items-center justify-center z-40">
                              <div className="bg-white p-6 rounded shadow-sm w-96 z-50">
                                <h2 className="text-lg font-bold mb-4">
                                  Confirm Deletion
                                </h2>
                                <p>
                                  Are you sure you want to delete this Offer?
                                </p>
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
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No ad section found for "{search}".</p>
          )
        ) : data.length > 0 ? (
          <div>
            {data.map((elem, parentIndex) => {
              // Calculate the starting index for the current parent
              const parentOffset = data
                .slice(0, parentIndex)
                .reduce((acc, curr) => acc + curr.child.length, 0);

              return (
                <div key={parentIndex} className="w-full">
                  {elem.child.map((childElem, childIndex) => {
                    // Calculate the global index
                    const globalIndex = parentOffset + childIndex + 1;

                    return (
                      <div
                        key={`${parentIndex}-${childIndex}`}
                        className="w-full py-3 grid grid-cols-[40px_1fr_150px_1fr_1fr_1fr_1fr_80px_70px] items-center border-b-[1px] border-gray-100"
                      >
                        <h1 className="text-base text-center">{globalIndex}</h1>

                        <h1 className="text-base text-center break-words w-28 ">
                          {childElem.title}
                        </h1>

                        <div className="h-full w-full flex items-center justify-center ">
                          <img
                            src={childElem.image.url}
                            alt=""
                            height={70} width={100}
                          />
                        </div>

                        <h1 className="text-base text-center">
                          {elem.category.category}
                        </h1>

                        <h1 className="text-base text-center">
                          {childElem.subcategory.subcategory}
                        </h1>

                        <h1 className="text-base text-center">
                          {childElem.childcategory?.childcategory || "N/A"}
                        </h1>

                        <h1 className="text-base text-center ">
                          {childElem.childcategory?.price || 'N/A'}

                        </h1>

                        <h1 className="text-base text-center">{elem.status}</h1>

                        <div className="flex items-center justify-center gap-2 text-center">
                          <Link href={`/section/edit/${elem._id}/${childElem._id}`}>
                            <MdEdit size={20} />
                          </Link>
                          <MdDelete
                            size={20}
                            onClick={() =>
                              handleDeleteClick(elem._id, childElem._id)
                            }
                          />
                        </div>

                        {/* Confirmation Modal */}
                        {showModal && (
                          <div className="fixed inset-0 flex items-center justify-center z-40">
                            <div className="bg-white p-6 rounded shadow-sm w-96 z-50">
                              <h2 className="text-lg font-bold mb-4">
                                Confirm Deletion
                              </h2>
                              <p>Are you sure you want to delete this Offer?</p>
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
                    );
                  })}
                </div>
              );
            })}
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
                previousClassName="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                nextClassName="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                previousLinkClassName="hover:text-blue-500"
                nextLinkClassName="hover:text-blue-500"
                activeLinkClassName="bg-blue-500 text-white px-2 py-1 rounded"
              />
            </div>
          </div>
        ) : (
          <p>No ad section found.</p>
        )}
      </div>
    </div>
  );
};

export default page;
