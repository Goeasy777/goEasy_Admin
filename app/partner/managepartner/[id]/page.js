"use client";
import {
  addPartnerWallethandeler,
  addWallethandeler,
} from "@/store/Actions/adminActions";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaWallet } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

const Report = ({ params }) => {
  const { id } = params;
  const [userdata, setUserdata] = useState({});
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState("");
  const [len, setLen] = useState("");
  const dispatch = useDispatch();

  const fetchPartner = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/partner/getpartnerbyid/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Partner");
      }
      const data = await response.json();
      setUserdata(data.data);
      setLen(data.data.orderId);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPartner();
  }, []);

  const handleAddBalance = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("partnerId", id);
    formData.append("amount", amount);
    formData.append("message", "Amount credited by goeasy");
    formData.append("status", "Credit");
    await dispatch(addPartnerWallethandeler(formData));
    setAmount("");
    fetchPartner();
    fetchWallet();
  };

  const handleSubtractBalance = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("partnerId", id);
    formData.append("amount", amount);
    formData.append("message", "Amount debited by goeasy");
    formData.append("status", "Debit");
    await dispatch(addPartnerWallethandeler(formData));
    setAmount("");
    fetchPartner();
    fetchWallet();
  };

  const fetchWallet = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/partner/getpartnerwallet?id=${id}&page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wallet");
      }
      const data = await response.json();
      setData(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [limit, page]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    console.log(userdata);
  }, [userdata]);

  const ShowNum = () => {
    return (
      <div className="flex flex-col gap-4" style={{}}>
        <select
          className="shadow-sm"
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
    <div className="flex flex-col bg-white  w-full min-h-screen text-[#5A6ACF] py-6 px-4 gap-8 rounded-md shadow-sm">
      <div className="bg-gray-100 flex flex-col gap-5 p-5 rounded-md">
        <div className="bg-white text-black font-semibold px-8 py-5 rounded-sm">
          <h3 className="text-xl">{userdata.name} Credit Record</h3>
        </div>

        <div className="flex flex-row gap-6 w-full">
          {/* <div className="flex items-center bg-white p-4 rounded-sm w-full md:w-1/6  ">
                        <div className="mr-4">
                            <FaShoppingCart className="h-8 w-8 text-[#5A6ACF]" />
                        </div>
                        <div>
                            <h3 className="text-xs font-medium text-gray-500">Total Orders</h3>
                            <p className="mt-1 text-base font-semibold text-black">
                                {len.length > 0 ? (len.length) : (' 0 ')} Orders
                            </p>
                        </div>
                    </div> */}

          <div className="flex items-center bg-white p-4 rounded-sm w-full md:w-1/6  ">
            <div className="mr-4">
              <FaWallet className="h-8 w-8 text-[#5A6ACF]" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-500">Wallet</h3>
              <p className="mt-1 text-base font-semibold text-black">
                {userdata?.wallet?.balance} Rs.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black font-semibold px-8 py-5 rounded-sm">
          <h3 className="text-xl">Add or Subtract Balance</h3>
        </div>

        <div className="bg-white p-6 rounded-sm  w-full">
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 font-medium mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border-none text-black bg-gray-50 border-gray-300 rounded-sm"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
              onClick={handleAddBalance}
            >
              Add Balance
            </button>

            <button
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              onClick={handleSubtractBalance}
            >
              Subtract Balance
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 flex flex-col gap-5 p-5 rounded-md">
        <div className="bg-white text-black font-semibold px-8 py-5 rounded-sm">
          <h3 className="text-xl">Partnername Wallet Transaction Report</h3>
        </div>

        <div className="p-6 bg-white rounded-sm">
          <div className="flex justify-between items-center text-black mb-4">
            <div className="py-3 flex items-center gap-4 ">
              <h1>Show Entries</h1>
              <ShowNum />
            </div>

            {/* <div className="text-black">
                            <label className="mr-2">Search:</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#5A6ACF]"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div> */}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="min-w-full bg-white  text-black  text-center">
            <div className="py-3 w-full grid grid-cols-[1fr_1fr_300px_1fr_1fr]  opacity-70 border-b-[1px] border-gray-100  text-textBlack">
              <h1 className="text-center">Sr No.</h1>
              <h1 className="text-center">Wallet Id</h1>
              <h1 className="text-center">Message</h1>
              <h1 className="text-center">Status</h1>
              <h1 className="text-center">Amount</h1>
            </div>

            <div>
              {data.length > 0 ? (
                data.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className="py-3 w-full grid grid-cols-[1fr_1fr_300px_1fr_1fr]  border-b-[1px] border-gray-100  text-textBlack"
                  >
                    <h1 className=" ">{index + 1}</h1>
                    <h1 className=" ">{transaction.walletId}</h1>
                    <h1 className=" "> {transaction.message}</h1>
                    <h1 className=" ">
                      <span
                        className={`px-3 py-1 rounded-md text-white text-sm ${
                          transaction.status === "Debit"
                            ? "bg-red-500"
                            : "bg-black"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </h1>
                    <h1
                      className={`  ${
                        transaction.status === "Debit"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {transaction.status === "Credit"
                        ? `+₹${transaction.amount}`
                        : `-₹${transaction.amount}`}
                    </h1>
                  </div>
                ))
              ) : (
                <div>
                  <h1 className="py-4 text-center">No transactions found.</h1>
                </div>
              )}
            </div>
          </div>

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
      </div>
    </div>
  );
};

export default Report;
