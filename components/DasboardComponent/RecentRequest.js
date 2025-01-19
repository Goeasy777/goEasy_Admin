"use client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";

const RecentRequest = () => {
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");

  const fetchorder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getorder?page=${page}`
      );
      const Data = await response.json();

      setData(Data.data);
      setTotalPages(Data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchorder();
  }, [page]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <div className="max-h-[85vh] w-full px-4 py-5 bg-formBG mb-5 rounded-md shadow-md">
      {/* Header */}
      <div className="py-3 w-full grid grid-cols-[40px_1fr_1fr_1fr_1fr] sm:grid-cols-[40px_1fr_1fr_1fr_1fr] opacity-70 border-b-[1px] border-gray-200 overflow-x-auto">
        <h1 className="text-xs sm:text-base text-center">No.</h1>
        <h1 className="text-xs sm:text-base text-center">Order ID</h1>
        <h1 className="text-xs sm:text-base text-center">
          Vender
        </h1>
        <h1 className="text-xs sm:text-base text-center">
          Current Status
        </h1>
        <h1 className="text-xs sm:text-base text-center">
          Payment Method
        </h1>
      </div>

      {/* Content */}
      <div className="max-h-[65vh] overflow-x-auto">
        {data && data.length > 0 ? (
          data.map((elem, index) => (
            <div
              key={index}
              className="w-full py-3 grid grid-cols-[40px_1fr_1fr_1fr_1fr] sm:grid-cols-[40px_1fr_1fr_1fr_1fr] items-center border-b-[1px] border-gray-100"
            >
              <h1 className="text-xs sm:text-base text-center">{index + 1}</h1>
              <h1 className="text-xs sm:text-base text-center truncate">
                {elem.orderid}
              </h1>
              <h1 className="text-xs sm:text-base text-center truncate">
                {elem.service_partner_name}
              </h1>
              <h1 className="text-xs sm:text-base text-center truncate">
                {elem.current_status}
              </h1>
              <h1 className="text-xs sm:text-base text-center truncate">
                {elem.Payment_Method}
              </h1>
            </div>
          ))
        ) : (
          <p className="text-center mt-5">No Recent Request found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="w-full items-center justify-end mt-4">
        <ReactPaginate
          className="h-full w-full flex flex-wrap items-center justify-end gap-2 sm:gap-4 pr-4 sm:pr-14 text-xs sm:text-base"
          previousLabel={"<"}
          nextLabel={" >"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          previousClassName="bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded"
          nextClassName="bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded"
          previousLinkClassName="hover:text-blue-500"
          nextLinkClassName="hover:text-blue-500"
          activeLinkClassName="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded"
        />
      </div>
    </div>
  );
};

export default RecentRequest;
