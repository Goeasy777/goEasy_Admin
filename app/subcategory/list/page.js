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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  // const [deleted, setDelete] = useState(false)
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  const fetchSubCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getSubcategoryForD?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Sub Category");
      }
      const data = await response.json();
      setData(data.subcategory);
      setTotalPages(data.totalPages);
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/searchSubcategory/${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to search sub category");
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
    setSelectedSubcategoryId(id);
    setShowModal(true);
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteSubcategory/${selectedSubcategoryId}`
      );
      if (response.ok) {
        setShowModal(false); // Close the modal after successful deletion
        if (search) {
          setSearchResults((prevResults) =>
            prevResults.filter(
              (subcategory) => subcategory._id !== selectedSubcategoryId
            )
          );
        } else {
          setData((prevData) =>
            prevData.filter(
              (subcategory) => subcategory._id !== selectedSubcategoryId
            )
          );
        }
      }
    } catch (err) {
      console.error("Error deleting subcategory:", err.message);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, [limit, page]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

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

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <div className="h-full w-full flex flex-col  py-10 px-14 gap-10 bg-formBG rounded-md">
      <div className="py-3 px-8 flex justify-between items-center text-xl w-full  border-none shadow-sm bg-headerBG">
        <h1 className="text-textBlack">Sub Category List</h1>

        <LinkButton url="/subcategory/add" value="Add New Sub Category" />
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center px-6 w-full border-none shadow-sm bg-headerBG ">
        <div className="py-3 flex items-center gap-2 ">
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
            placeholder="Search Sub Category..."
          />
          <button className="bg-searchBG p-2 text-textWhite" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* Table Headers */}
      <div className="py-3 w-full grid grid-cols-[40px_1fr_1fr_200px_1fr_1fr]  opacity-70 border-b-[1px] border-none text-textBlack">
        <h1 className="text-base text-center">No.</h1>
        <h1 className="text-base text-center">Main Category</h1>
        <h1 className="text-base text-center">Sub Category</h1>
        <h1 className="text-base text-center">Image</h1>
        <h1 className="text-base text-center">Status</h1>
        <h1 className="text-base text-center">Action</h1>
      </div>

      {/* Display Search Results if search is active, otherwise display all subcategories */}
      <div>
        {search ? (
          searchResults.length ? (
            searchResults.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3 grid items-center grid-cols-[40px_1fr_1fr_200px_1fr_1fr] border-b-[1px] border-gray-100 text-textBlack"
              >
                <h1 className="text-base text-center">{index + 1}</h1>
                <h1 className="text-base text-center">
                  {elem.category.category}
                </h1>
                <h1 className="text-base text-center">{elem.subcategory}</h1>
                <div className="h-full w-full flex justify-center items-center">
                  <img src={elem.image.url} alt="" height={70} width={100} />
                </div>
                <h1 className="text-base text-center">{elem.status}</h1>

                <div className="flex items-center justify-center gap-2 text-center">
                  <Link href={`/subcategory/edit/${elem._id}`}>
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
                      <p>Are you sure you want to delete this subcategory?</p>
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
            <p>No subcategories found for "{search}".</p>
          )
        ) : data && data.length > 0 ? (
          <div>
            {data.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3 grid items-center grid-cols-[40px_1fr_1fr_200px_1fr_1fr] border-b-[1px] border-gray-100 text-textBlack"
              >
                <h1 className="text-base text-center">{index + 1}</h1>
                <h1 className="text-base text-center">
                  {elem.category.category}
                </h1>
                <h1 className="text-base text-center">{elem.subcategory}</h1>
                <div className="h-full w-full flex justify-center">
                  <img src={elem.image.url} alt="" height={70} width={100} />
                </div>
                <h1 className="text-base text-center">{elem.status}</h1>

                <div className="flex items-center justify-center gap-2 text-center">
                  <Link href={`/subcategory/edit/${elem._id}`}>
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
                      <p>Are you sure you want to delete this subcategory?</p>
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
          <p>No subcategories found.</p>
        )}
      </div>
    </div>
  );
};

export default page;
