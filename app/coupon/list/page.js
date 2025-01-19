"use client";
import LinkButton from "@/components/LinkButton";
import { couponStatushandler } from "@/store/Actions/adminActions";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

const page = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [deleted, setDelete] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();

  const fetchCoupons = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/fetchCouponcode?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch coupon");
      }

      const data = await response.json();
      setData(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err.message);
    }
  };

  const getDate = (data) => {
    const dateString = data;
    return new Date(dateString).toISOString().split("T")[0];
  };

  const SearchHandler = async (e) => {
    // e.preventDefault();
    // try {
    //   const response = await fetch(
    //     `http://localhost:5000/users/searchCity/${search}`
    //   );
    //   if (!response.ok) {
    //     throw new Error("Failed to search cities");
    //   }
    //   const result = await response.json();
    //   setSearchResults(result.data);
    //   // setSearch("")
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  const handleDeleteClick = (id) => {
    console.log(id);

    setSelectedCouponId(id);
    setShowModal(true);
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteCouponcode/${selectedCouponId}`
      );
      if (response.ok) {
        setShowModal(false); // Close the modal after successful deletion
        if (search) {
          setSearchResults((prevResults) =>
            prevResults.filter((city) => city._id !== selectedCouponId)
          );
        } else {
          setData((prevData) =>
            prevData.filter((city) => city._id !== selectedCouponId)
          );
        }
      }
    } catch (err) {
      console.error("Error deleting city:", err.message);
    }
  };

  const handleCouponStatus = async (status, id) => {
    const formdata = new FormData();
    formdata.append("status", status);
    formdata.append("id", id);
    await dispatch(couponStatushandler(formdata));
    fetchCoupons();
  };

  useEffect(() => {
    fetchCoupons();
    setDelete(false);
  }, [deleted]);

  useEffect(() => {
    fetchCoupons();
  }, [limit, page]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const ShowNum = () => {
    return (
      <div className="flex flex-col gap-2" style={{}}>
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
        <h1>List Coupon</h1>
        <LinkButton url="/coupon/add" value="Add New Coupon" />
      </div>

      <div className="flex justify-between items-center px-6 w-full  border-none shadow-sm bg-headerBG">
        <div className="py-3 flex items-center gap-2 ">
          <h1>Show Entries</h1>
          <ShowNum />
        </div>

        <form onSubmit={SearchHandler}>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            className="outline-none  border-none shadow-sm"
            placeholder="Search Coupon..."
          />
          <button className="bg-searchBG p-2 text-white" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="h-full w-full flex flex-col gap-5">
        {/* Table Headers */}
        <div className="py-3 grid grid-cols-[40px_150px_80px_80px_1fr_100px_100px_100px] opacity-70 border-b-[1px] border-gray-200 ">
          <h1 className="text-base text-center">No.</h1>
          <h1 className="text-base text-center">Coupon Code</h1>
          <h1 className="text-base text-center ">Percentage</h1>
          <h1 className="text-base text-center ">Amount</h1>
          <h1 className="text-base text-center">Decription</h1>
          <h1 className="text-base text-center">Expiry Date</h1>
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
                  className="w-full py-3 grid grid-cols-[40px_150px_80px_80px_1fr_100px_100px_100px] border-b-[1px] border-gray-100 "
                >
                  <h1 className="text-base text-center">{index + 1}</h1>
                  <h1 className="text-base text-center">{elem.couponcode}</h1>
                  <h1 className="text-base text-center">{elem.percentage}</h1>
                  <h1 className="text-base text-center">
                    {elem.maximumamount}
                  </h1>
                  <h1 className="text-base text-center">{elem.description}</h1>
                  <h1 className="text-base text-center">
                    {getDate(elem.expirydate)}
                  </h1>
                  <h1 className=" text-center text-sm ">
                    {elem.status === "Enable" ? (
                      <button
                        onClick={() => {
                          handleCouponStatus("Disable", elem._id);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Disable
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleCouponStatus("Enable", elem._id);
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Enable
                      </button>
                    )}
                  </h1>
                  <div className="0" z>
                    {/* <Link href={`/city/edit/${elem._id}`}>
                      <MdEdit size={20} />
                    </Link> */}
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
                        <p>Are you sure you want to delete this coupon?</p>
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
              <p>No coupon found for "{search}".</p>
            )
          ) : data.length > 0 ? (
            <div>
              {data.map((elem, index) => (
                <div
                  key={index}
                  className="w-full py-3 grid grid-cols-[40px_150px_80px_80px_1fr_100px_100px_100px] border-b-[1px] border-gray-100 "
                >
                  <h1 className="text-base text-center">{index + 1}</h1>
                  <h1 className="text-base text-center">{elem.couponcode}</h1>
                  <h1 className="text-base text-center ">{elem.percentage}</h1>
                  <h1 className="text-base text-center ">
                    {elem.maximumamount}
                  </h1>
                  <h1 className="text-base text-center ">{elem.description}</h1>

                  <h1 className="text-base text-center">
                    {getDate(elem.expirydate)}
                  </h1>
                  {/* <h1 className="text-base text-center">{elem.status}</h1> */}
                  <h1 className=" text-center text-sm ">
                    {elem.status === "Enable" ? (
                      <button
                        onClick={() => {
                          handleCouponStatus("Disable", elem._id);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Disable
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleCouponStatus("Enable", elem._id);
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Enable
                      </button>
                    )}
                  </h1>

                  <div className="flex items-center justify-center text-center">
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
                        <p>Are you sure you want to delete this coupon?</p>
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
            <p>No coupon found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
