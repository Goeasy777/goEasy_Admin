"use client";
import LinkButton from "@/components/LinkButton";
import { childcategoryStatushandler } from "@/store/Actions/adminActions";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

const page = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedChildcategoryId, setSelectedChildcategoryId] = useState(null);
  const [selectedChildcategory, setSelectedChildcategory] = useState(null);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  const fetchChildCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getChildCategoryForD?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Child Category");
      }
      const data = await response.json();
      setData(data.childcategory);
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/searchChildCategory/${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to search child category");
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
    setSelectedChildcategoryId(id);
    setShowModal(true);
  };

  const handleSelectChange = (event, child) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case "Preview":
        setSelectedChildcategory(child);
        setShowInfoCard(true);
        break;
      case "Edit":
        router.push(`/childcategory/edit/${child._id.toString()}`);
        break;
      case "Delete":
        // deleteHandler(child._id);
        handleDeleteClick(child._id);
        break;
      default:
        router.push(`/customer/list`);
        break;
    }
    setSelectedOption((prev) => ({ ...prev, [child._id]: "" }));
  };

  const handleChildcategoryStatus = async (status, id) => {
    const formdata = new FormData();
    formdata.append("status", status);
    formdata.append("id", id);
    await dispatch(childcategoryStatushandler(formdata));
    fetchChildCategory();
  };

  const closeInfoCard = () => {
    setShowInfoCard(false);
    setSelectedChildcategory(null);
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteChildCategory/${selectedChildcategoryId}`
      );
      if (response.ok) {
        setShowModal(false); // Close the modal after successful deletion
        if (search) {
          setSearchResults((prevResults) =>
            prevResults.filter(
              (childcategory) => childcategory._id !== selectedChildcategoryId
            )
          );
        } else {
          setData((prevData) =>
            prevData.filter(
              (childcategory) => childcategory._id !== selectedChildcategoryId
            )
          );
        }
      }
    } catch (err) {
      console.error("Error deleting subcategory:", err.message);
    }
  };

  useEffect(() => {
    fetchChildCategory();
  }, [limit, page]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const ShowNum = () => {
    return (
      <div className="flex flex-col gap-4 text-textBlack">
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
    <div className="h-full w-full flex flex-col  py-10 px-14 gap-10 bg-formBG rounded-md ">
      <div className="py-3 px-8 flex justify-between items-center text-xl w-full border-none rounded-md shadow-sm text-textBlack bg-inputBG">
        <h1 className="text-xl">Child Category List</h1>

        <LinkButton url="/childcategory/add" value="Add New Child Category" />
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center px-6 w-full border-none rounded-md shadow-sm bg-inputBG">
        <div className="py-3 flex items-center gap-2 text-textBlack">
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
            placeholder="Search Child Category..."
          />
          <button className="bg-searchBG p-2 text-textWhite" type="submit">
            Search
          </button>
        </form>
      </div>

      {showInfoCard && selectedChildcategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-40">
          {/* Info Card */}
          <div className="h-[85%] max-w-[55%] bg-gray-100 p-6 shadow-xl z-50 rounded-md relative">
            {/* Title Section */}
            <div className="text-black text-center font-semibold rounded-md p-2 mb-1 ">
              <h3 className="text-lg font-bold opacity-70">
                Child Category Preview
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
            <div className="h-[95%] w-full flex flex-row justify-between px-5 py-3 mt-3 gap-4">
              {/* left */}
              <div className="w-[40%] flex flex-col gap-5 h-full p-3">

                <div className="w-full flex items-center justify-center ">
                  <img
                    src={selectedChildcategory.image.url}
                    alt=""
                    className="h-[150px] w-[180px] object-contain"
                  />
                </div>

                <div className="py-4 flex flex-col gap-4">

                  <div className="flex flex-row gap-1 text-center items-center justify-between px-2 ">
                    <p className="text-base">Category</p>
                    <h1 className="text-xl pl-3 font-semibold">
                      {selectedChildcategory.category.category}
                    </h1>
                  </div>

                  <div className="flex flex-row gap-1 text-center items-center justify-between px-2 ">
                    <p className="text-base">Subcategory</p>
                    <h1 className="text-xl pl-3 font-semibold">
                      {selectedChildcategory.subcategory.subcategory}
                    </h1>
                  </div>

                  <div className="flex flex-row gap-1 text-center items-center justify-between px-2 ">
                    <p className="text-base">Childcategory</p>
                    <h1 className="text-xl pl-3 font-semibold">
                      {selectedChildcategory.childcategory}
                    </h1>
                  </div>

                  <div className="flex flex-row gap-1 text-center items-center justify-between px-2 ">
                    <p className="text-base">City</p>
                    <h1 className="text-xl pl-3 font-semibold">
                      {selectedChildcategory.city}
                    </h1>
                  </div>

                </div>

                <div className="flex flex-row items-center justify-between px-2 gap-1">
                  <p className="text-base">Status</p>
                  <h1 className="text-base pl-3 ">
                    {selectedChildcategory.status === "Publish" ? (
                      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        Publish
                      </button>
                    ) : (
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Unpublish
                      </button>
                    )}
                  </h1>
                </div>

              </div>

              {/* right */}
              <div
                className={`w-[60%] grid grid-cols-2 items-center justify-center gap-3 p-1 `}
              >
                <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                  <p className="text-sm">Price</p>
                  <h1 className="text-lg">{selectedChildcategory.price}</h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                  <p className="text-sm">Platform Fee</p>
                  <h1 className="text-lg">
                    {selectedChildcategory.platformCharge}
                  </h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                  <p className="text-sm">Discount</p>
                  <h1 className="text-lg">
                    {selectedChildcategory.discount}
                    {"%"}
                  </h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                  <p className="text-sm">Service Time</p>
                  <h1 className="text-lg">
                    {selectedChildcategory.servicetime}
                  </h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                  <p className="text-sm">Max quantity</p>
                  <h1 className="text-lg">
                    {selectedChildcategory.maxquantity}
                  </h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                  <p className="text-sm">Service Quantity</p>
                  <h1 className="text-lg">
                    {selectedChildcategory.serviceQuantity}
                  </h1>
                </div>
                <div className="flex flex-col col-span-2 items-center justify-center gap-2 w-full h-full">
                  <p className="text-sm">Service Description</p>
                  <h1 className="text-lg max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {selectedChildcategory.serviceDescription}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Headers */}
      <div className="py-3 w-full grid grid-cols-[40px_1fr_1fr_1fr_150px_1fr_1fr_1fr]  opacity-70 border-b-[1px] text-textBlack border-gray-200">
        <h1 className="text-base text-center">No.</h1>
        <h1 className="text-base text-center">Main Category</h1>
        <h1 className="text-base text-center">Sub Category</h1>
        <h1 className="text-base text-center">Child Category</h1>
        <h1 className="text-base text-center">Image</h1>
        <h1 className="text-base text-center">Price</h1>
        <h1 className="text-base text-center">Status</h1>
        <h1 className="text-base text-center">Action</h1>
      </div>

      {/* Display Search Results if search is active, otherwise display all childcategories */}
      <div>
        {search ? (
          searchResults && searchResults.length ? (
            searchResults.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3  grid grid-cols-[40px_1fr_1fr_1fr_150px_1fr_1fr_1fr] items-center  text-textBlack border-b-[1px] border-gray-100"
              >
                <h1 className="text-base text-center">{index + 1}</h1>
                <h1 className="text-base text-center">
                  {elem.category.category}
                </h1>

                <h1 className="text-base text-center">
                  {elem.subcategory.subcategory}
                </h1>
                <h1 className="text-base text-center">{elem.childcategory}</h1>
                <div className="flex items-center justify-center">
                  <img src={elem.image.url} alt="" height={100} width={100} />
                </div>
                <h1 className="text-base text-center">{elem.price}</h1>
                <h1 className=" text-center text-sm ">
                  {elem.status === "Publish" ? (
                    <button
                      onClick={() => {
                        handleChildcategoryStatus("Unpublish", elem._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleChildcategoryStatus("Publish", elem._id);
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Publish
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
                    className="w-full text-sm outline-none border-none focus:ring-0 bg-gray-200"
                  >
                    <option value="">Select</option>
                    <option value="Preview">Preview</option>
                    <option value="Edit">Edit</option>
                    <option value="Delete">Delete</option>
                  </select>
                </div>
                {/* <div className="flex items-center justify-center gap-2 text-center">
                  <Link href={`/childcategory/edit/${elem._id}`}>
                    <MdEdit size={20} />
                  </Link>
                  <MdDelete
                    size={20}
                    onClick={() => handleDeleteClick(elem._id)}
                  />
                </div> */}

                {/* Confirmation Modal */}
                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded shadow-sm w-96 z-50">
                      <h2 className="text-lg font-bold mb-4">
                        Confirm Deletion
                      </h2>
                      <p>Are you sure you want to delete this childcategory?</p>
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
            <p>No childcategories found for "{search}".</p>
          )
        ) : data.length > 0 ? (
          <div>
            {data.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3  grid grid-cols-[40px_1fr_1fr_1fr_150px_1fr_1fr_1fr] items-center  text-textBlack border-b-[1px] border-gray-100"
              >
                <h1 className="text-base text-center">{index + 1}</h1>
                <h1 className="text-base text-center">
                  {elem.category.category}
                </h1>
                <h1 className="text-base text-center">
                  {elem.subcategory.subcategory}
                </h1>
                <h1 className="text-base text-center">{elem.childcategory}</h1>
                <div className="flex items-center justify-center">
                  <img src={elem.image.url} alt="" height={100} width={100} />
                </div>
                <h1 className="text-base text-center">{elem.price}</h1>
                <h1 className=" text-center text-sm ">
                  {elem.status === "Publish" ? (
                    <button
                      onClick={() => {
                        handleChildcategoryStatus("Unpublish", elem._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleChildcategoryStatus("Publish", elem._id);
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Publish
                    </button>
                  )}
                </h1>

                <div className="flex items-center justify-center gap-2 text-center">
                  <select
                    value={selectedOption[elem._id] || ""}
                    onChange={(e) => {
                      setSelectedOption((prev) => ({
                        ...prev,
                        [elem._id]: e.target.value,
                      }));
                      handleSelectChange(e, elem);
                    }}
                    className="w-full text-sm outline-none border-none focus:ring-0 bg-gray-200"
                  >
                    <option value="">Select</option>
                    <option value="Preview">Preview</option>
                    <option value="Edit">Edit</option>
                    <option value="Delete">Delete</option>
                  </select>
                </div>
                {/* <div className="flex items-center justify-center gap-2 text-center">
                  <Link href={`/childcategory/edit/${elem._id}`}>
                    <MdEdit size={20} />
                  </Link>
                  <MdDelete
                    size={20}
                    onClick={() => handleDeleteClick(elem._id)}
                  />
                </div> */}

                {/* Confirmation Modal */}
                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded shadow-sm w-96 z-50">
                      <h2 className="text-lg font-bold mb-4">
                        Confirm Deletion
                      </h2>
                      <p>Are you sure you want to delete this childcategory?</p>
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
          <p>No childcategories found.</p>
        )}
      </div>
    </div>
  );
};

export default page;
