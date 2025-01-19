"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Dispute = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getDisputes = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/partner/getDispute?limit=${limit}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Dispute");
      }
      const data = await response.json();
      console.log(data);

      setData(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDisputes();
  }, []);

  useEffect(() => {
    getDisputes();
  }, [limit, page]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

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

  return (
    <div className="flex flex-col bg-formBG w-full h-full   py-10 px-14 gap-10 rounded-md ">
      <div className="py-3 px-8 flex justify-between items-center text-xl w-full  border-none shadow-sm bg-headerBG">
        <h1>Partner Disputes</h1>
      </div>

      <div className="flex justify-between items-center px-6 w-full border-none rounded-sm bg-headerBG shadow-sm">
        <div className="py-3 flex items-center gap-2  border-none rounded-sm">
          <h1 className="text-textBlack">Show Entries</h1>
          <ShowNum />
        </div>
      </div>

      <div className="py-3 w-full grid grid-cols-[40px_1fr_400px_1fr]  opacity-70 border-b-[1px] border-gray-100 text-textBlack">
        <h1 className="text-center text-base">No.</h1>
        <h1 className="text-center text-base">Partner</h1>
        <h1 className="text-center text-base">Dispute</h1>
        <h1 className="text-center text-base">Status</h1>
      </div>

      <div>
        {data.length > 0 ? (
          <div>
            {data.map((data, index) => (
              <div
                key={data.id}
                className="py-3 w-full grid grid-cols-[40px_1fr_400px__1fr] items-center  border-b-[1px] border-gray-100 text-textBlack"
              >
                <h1 className="text-center text-base ">{index + 1}</h1>
                <h1 className="text-center text-base ">
                  {data?.partner?.name || "None"}
                </h1>
                <h1 className="text-center text-base  "> {data.dispute}</h1>
                <h1 className="text-center text-base  "> {data.status}</h1>
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
          <div>
            <h1 className="py-4 text-center">No Dispute found.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dispute;
