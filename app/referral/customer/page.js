"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const page = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReferralCode = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getUser?limit=${limit}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Referral code");
      }
      const data = await response.json();
      setData(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchReferralCode();
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
      <div className="py-3 px-8 flex justify-between items-center w-full border-none shadow-sm bg-headerBG">
        <h4 className="text-xl">Customer Referral List</h4>
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center px-6 w-full border-none shadow-sm bg-headerBG">
        <div className="py-3 flex items-center gap-2 ">
          <h1>Show Entries</h1>
          <ShowNum />
        </div>
      </div>

      {/* Table Headers */}
      <div className="py-3 w-full grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr]  opacity-70 border-b-[1px] border-gray-200">
        <h1 className="text-base text-center">No.</h1>
        <h1 className="text-base text-center">Name</h1>
        <h1 className="text-base text-center">My Referral </h1>
        <h1 className="text-base text-center">Referrer</h1>
        <h1 className="text-base text-center">Amount</h1>
        <h1 className="text-base text-center">Status</h1>
      </div>

      {/* Display Error if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Search Results if search is active, otherwise display all cities */}
      <div>
        {data.length > 0 ? (
          <div>
            {data.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3 grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] items-center border-b-[1px] border-gray-100"
              >
                <h1 className="text-base text-center ">{index + 1}</h1>
                <h1 className="text-base text-center ">{elem.name}</h1>
                <h1 className="text-base text-center ">
                  {elem.myReferralCode}
                </h1>
                <h1 className="text-base text-center ">
                  {elem.referralCode || "None"}
                </h1>
                <h1 className="text-base text-center ">
                  {elem.wallet.balance}
                </h1>
                <h1 className="text-base text-center ">{elem.status}</h1>
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
          <p>No Referral Code found.</p>
        )}
      </div>
    </div>
  );
};

export default page;
