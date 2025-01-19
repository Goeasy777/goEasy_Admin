"use client";
import LinkButton from "@/components/LinkButton";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { MdEditSquare, MdDelete, MdClose } from "react-icons/md";
import ReactPaginate from "react-paginate";

const page = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showInfoCard, setShowInfoCard] = useState(false);

  // const dispatch = useDispatch()

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getcategoryorder?category=Progressing&limit=${limit}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order");
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
      fetchOrder();
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/searchorder?title=${search}&category=Progressing`
      );
      if (!response.ok) {
        throw new Error("Failed to search order");
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

  const handleSelectChange = (order) => {
    setSelectedOrder(order);
    setShowInfoCard(true);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Optimistically update the status locally
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, current_status: newStatus } : item
        )
      );

      // Update the status in the backend
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/handleorderstatus/${id}`,
        { current_status: newStatus }
      );

      // Fetch the latest data to confirm changes
      fetchOrder();
    } catch (error) {
      setError("Failed to update status. Please try again.");
    }
  };

  const closeInfoCard = () => {
    setShowInfoCard(false);
    setSelectedOrder(null);
  };

  // useEffect(() => {
  //   fetchOrder();
  // }, [handleStatusChange]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    fetchOrder();
  }, [limit, page]);

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
      <div className="py-4 px-8 flex justify-between text-xl items-center w-full border-none bg-headerBG shadow-sm">
        <h4>Progressing Order List</h4>
        {/* <LinkButton url='/service/add' value="Add New Service"/> */}
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center px-6 w-full border-none bg-headerBG shadow-sm">
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
            placeholder="Search Progressing Order..."
          />
          <button className="bg-searchBG p-2 text-textWhite" type="submit">
            Search
          </button>
        </form>
      </div>

      {showInfoCard && selectedOrder && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl p-5 overflow-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeInfoCard}
              className="absolute top-6 right-6 bg-gray-300 hover:bg-gray-400 p-2 rounded-full transition-colors"
              aria-label="Close"
            >
              <MdClose size={24} />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-5 text-center py-4">
              Order Information
            </h2>

            <div className="p-8 bg-white rounded-md shadow-sm w-full mx-auto text-gray-800 border">
              {/* Top Order Details */}
              <div className="mb-3 p-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  Order Detail
                </h3>
                <div className="mt-2 border-b gap-2 p-4 border rounded-md shadow-sm bg-gray-50  w-full">
                  <div className="grid grid-cols-4 gap-4 text-center capitalize">
                    <h3 className=" font-medium text-base ">Order ID:</h3>
                    <h3 className=" font-medium text-base">Order Date:</h3>
                    <h3 className=" font-medium text-base">Mobile Number:</h3>
                    <h3 className=" font-medium text-base ">Customer Name:</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center capitalize">
                    <p className="text-sm text-gray-500 font-semibold">
                      {selectedOrder.orderid ?? "null"}
                    </p>
                    <p className="text-sm text-gray-500 font-semibold">
                      {new Date(
                        selectedOrder.createdAt ?? "null"
                      ).toLocaleDateString()}{" "}
                    </p>
                    <p className="text-sm text-gray-500 font-semibold">
                      {selectedOrder?.customerId?.mobile ?? "null"}
                    </p>
                    <p className="text-sm text-gray-500 font-semibold capitalize">
                      {selectedOrder?.customerId?.name ?? "null"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping address */}
              <div className="mb-3 p-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  Shipping Address
                </h3>
                <div className="mt-2 gap-1 grid grid-cols-4  border rounded-md shadow-sm bg-gray-50 p-4">
                  <div className="grid grid-rows-2 col-span-2 items-center justify-center text-center  capitalize">
                    <h4 className=" font-medium line-clamp-3 ">
                      Full Address:
                    </h4>
                    <p className="text-sm text-gray-500 font-semibold">
                      {selectedOrder?.shipping_address?.addressLine1 ?? "null"}{" "}
                      {" , "}
                      {selectedOrder?.shipping_address?.addressLine2 ??
                        "null"}{" "}
                      {" , "}
                      {selectedOrder?.shipping_address?.floor ?? "null"} {" , "}
                      {selectedOrder?.shipping_address?.landmark ?? "null"}
                    </p>
                  </div>
                  <div className="grid grid-rows-2 items-center justify-center text-center  capitalize">
                    <h4 className="font-medium">City/Pin:</h4>
                    <p className="text-sm text-gray-500 font-semibold">
                      {selectedOrder.shipping_address.postalCode ?? "null"}
                      {" , "}
                      {selectedOrder.shipping_address.city ?? "null"}
                    </p>
                  </div>
                  <div className="grid grid-rows-2 items-center justify-center text-center capitalize">
                    <h4 className="font-medium">Order Status:</h4>
                    <p className="text-sm text-gray-500 font-semibold">
                      {selectedOrder.current_status ?? "null"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Render Childcategories */}
              <div className="mb-3 p-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  Order Items
                </h3>
                {selectedOrder.childcategories?.map((child, index) => (
                  <div
                    key={index}
                    className="mt-2 py-4 px-6 border rounded-md shadow-sm bg-gray-50 flex flex-col gap-1 capitalize"
                  >
                    <p className="text-lg font-semibold">
                      {index + 1}
                      {") "} {child.childcategory ?? "null"}
                    </p>
                    <p className="text-sm px-4">
                      Disc. {child.discount ?? "null"} %
                    </p>
                    <p className="text-sm px-4">
                      Qty 1 x {child.price ?? "null"} Rs.
                    </p>
                    <p className="px-4">
                      Price:{" "}
                      {child.price
                        ? Math.round(
                          child.price -
                          (child.price * (child.discount ?? 0)) / 100
                        )
                        : "null"}{" "}
                      Rs
                    </p>
                  </div>
                )) ?? <p>No items available</p>}
              </div>

              {/* Date and Time Slot Details */}
              <div className="mb-3 p-2 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-700">
                  Date And Time Slot Details
                </h3>
                <div className="mt-2 grid grid-cols-4 w-full p-4 items-center justify-center text-gray-800 border rounded-md shadow-sm bg-gray-50">
                  <div className="grid grid-rows-2 gap-2 text-center capitalize">
                    <h4 className=" font-medium text-base">Date:</h4>
                    <p className="text-sm text-gray-500 font-semibold">
                      {/* {selectedOrder.date ?? "null"} */}
                      {new Date(
                        selectedOrder?.date ?? "null"
                      ).toLocaleDateString()}{" "}
                    </p>
                  </div>
                  <div className="grid grid-rows-2 gap-2 text-center capitalize">
                    <h4 className=" font-medium text-base">Time:</h4>
                    <p className="text-sm text-gray-500 font-semibold">
                      {selectedOrder?.time ?? "null"}
                    </p>
                  </div>
                  <div className="grid grid-rows-2 gap-2 text-center capitalize">
                    <h4 className="font-medium text-base">Category:</h4>
                    <p className="text-sm text-gray-500 font-semibold">
                      {selectedOrder?.category?.category ?? "null"}
                    </p>
                  </div>

                  <div className="grid grid-rows-2 gap-2 text-center capitalize">
                    <h4 className="font-medium text-base">Payment</h4>
                    <p className="text-sm text-gray-500 font-semibold truncate">
                      {selectedOrder?.Payment_Method ?? "null"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment details */}
              {selectedOrder.Payment_Method === 'Online (UPI/Wallet/Debit Card)'
                && (
                  < div className="mb-3 p-2 flex flex-col">

                    <h3 className="text-lg font-semibold text-gray-700">
                      Payment Detail
                    </h3>

                    <div className="grid grid-cols-3 mt-2 w-full p-4 gap-2 text-gray-800 items-center border rounded-md shadow-sm bg-gray-50">

                      <div className="grid grid-rows-2 gap-2 text-center capitalize">
                        <h4 className="font-medium text-base">RazorPay Id</h4>
                        <p className="text-sm text-gray-500 font-semibold">
                          {selectedOrder.paymentId ?? "null"}
                        </p>
                      </div>

                      <div className="grid grid-rows-2 gap-2 text-center capitalize">
                        <h4 className=" font-medium text-base">Payment Id</h4>
                        <p className="text-sm text-gray-500 font-semibold">
                          {selectedOrder.razorpayid ?? "null"}
                        </p>
                      </div>

                      <div className="grid grid-rows-2 gap-2 text-center capitalize">
                        <h4 className=" font-medium text-base">Payment Status</h4>
                        <p className="text-sm text-gray-500 font-semibold">
                          {selectedOrder.paymentStatus ?? "null"}
                        </p>
                      </div>
                    </div>

                  </div>)
              }

              {/* Total Order Report */}
              <div className="mb-3 p-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Order Report
                </h3>
                <div className="mt-2 text-gray-800 border rounded-md shadow-sm bg-gray-50 p-4 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-sm">
                      {selectedOrder.subtotal ?? "null"} Rs.
                    </span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-sm">+ Add On</span>
                    <span className="text-sm">
                      {selectedOrder.Add_on ?? "null"}
                    </span>
                  </div> */}
                  <div className="flex justify-between">
                    <span className="text-sm">- Discount</span>
                    <span className="text-sm">
                      {selectedOrder.discount ?? "null"} Rs.
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Net Amount</span>
                    <span>{selectedOrder.bill_amount ?? "null"} Rs.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Headers */}
      <div className="py-3 w-full grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr_100px_120px]  opacity-70 border-b-[1px] border-gray-200">
        <h1 className="text-base text-center">No.</h1>
        <h1 className="text-base text-center">Order ID</h1>
        <h1 className="text-base text-center">Partner Name</h1>
        <h1 className="text-base text-center">Type</h1>
        <h1 className="text-base text-center">Bill Amount</h1>
        <h1 className="text-base text-center">Payment Method</h1>
        <h1 className="text-base text-center">Preview</h1>
        <h1 className="text-base text-center">Status</h1>
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
                className="w-full py-3 grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr_100px_120px]  border-b-[1px] border-gray-100"
              >
                <h1 className="text-base text-center ">{index + 1}</h1>
                <h1 className="text-base text-center ">{elem.orderno}</h1>
                {/* <h1 className="text-base text-center ">
                  {elem.category.category}
                </h1> */}
                <h1 className="text-base text-center ">
                  {elem.service_partner_name}
                </h1>
                {/* <h1 className="text-base text-center ">
                  {elem.credit_required}
                </h1> */}

                <h1 className="text-base text-center ">{elem.hire_type}</h1>
                <h1 className="text-base text-center ">{elem.bill_amount}</h1>
                <h1 className="text-base text-center ">
                  {elem.Payment_Method}
                </h1>
                <div className="px-2 cursor-pointer">
                  <h1
                    className="text-sm text-center rounded bg-green-500 text-white p-1"
                    onClick={() => {
                      handleSelectChange(elem);
                    }}
                  >
                    Preview
                  </h1>
                </div>
                <div className="flex items-center justify-center p-2">
                  <select
                    value={elem.current_status}
                    onChange={(e) =>
                      handleStatusChange(elem._id, e.target.value)
                    }
                    className="bg-gray-50 rounded px-2 py-1 text-sm w-full border-none cursor-pointer"
                  >
                    <option value="Progressing">Progressing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <p>No progressing order found for "{search}".</p>
          )
        ) : data && data.length > 0 ? (
          <div>
            {data.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3 grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr_100px_120px] items-center border-b-[1px] border-gray-100"
              >
                <h1 className="text-base text-center">{index + 1}</h1>
                <h1 className="text-base text-center ">{elem.orderno}</h1>
                <h1 className="text-base text-center ">
                  {elem.service_partner_name}
                </h1>
                {/* <h1 className="text-base text-center ">{elem.credit_required}</h1> */}
                <h1 className="text-base text-center ">{elem.hire_type}</h1>
                <h1 className="text-base text-center ">{elem.bill_amount}</h1>
                <h1 className="text-base text-center ">
                  {elem.Payment_Method}
                </h1>
                <div className="px-2 cursor-pointer">
                  <h1
                    className="text-sm text-center rounded bg-green-500 text-white p-1"
                    onClick={() => {
                      handleSelectChange(elem);
                    }}
                  >
                    Preview
                  </h1>
                </div>

                {/* <h1 className="text-base text-center ">{elem.current_status}</h1> */}
                <div className="flex items-center justify-center p-2">
                  <select
                    value={elem.current_status}
                    onChange={(e) =>
                      handleStatusChange(elem._id, e.target.value)
                    }
                    className="bg-gray-50 rounded px-2 py-1 text-sm w-full border-none cursor-pointer"
                  >
                    <option value="Progressing">Progressing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
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
          <p>No Progressing Order found.</p>
        )}
      </div>
    </div>
  );
};

export default page;
