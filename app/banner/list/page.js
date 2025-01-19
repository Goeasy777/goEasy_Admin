"use client";
import LinkButton from "@/components/LinkButton";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { debounce } from "lodash"; // To debounce the search

const ListBanner = () => {

  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState(null);

  const fetchBanner = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getBanner?page=${page}&limit=${limit}`
      );
      if (!response.ok) throw new Error("Failed to fetch banners");
      const result = await response.json();
      setData(result.data);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteBanner = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteBanner/${selectedBannerId}`
      );
      if (response.ok) {
        setShowModal(false);
        setData((prevData) =>
          prevData.filter((banner) => banner._id !== selectedBannerId)
        );
        setSearchResults((prevResults) =>
          prevResults.filter((banner) => banner._id !== selectedBannerId)
        );
      }
    } catch (err) {
      console.error("Error deleting banner:", err.message);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedBannerId(id);
    setShowModal(true);
  };

  const handleSearch = useCallback(
    debounce((query) => {
      setSearch(query);
    }, 500),
    []
  );

  useEffect(() => {
    fetchBanner();
  }, [limit, page]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    if (search) {
      setSearchResults(
        data.filter((item) =>
          item.category.category.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setSearchResults(data);
    }
  }, [search, data]);

  const ShowNum = () => (
    <div className="flex flex-col gap-4">
      <select
        className="shadow-sm rounded-sm border-gray-300"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  const BannerRow = ({ banner, index }) => (
    <div
      key={banner._id}
      className="w-full py-3 grid grid-cols-[40px_1fr_200px_1fr_1fr] text-textBlack border-b-[1px] border-gray-100 items-center"
    >
      <h1 className="text-base text-center">{index + 1}</h1>
      <h1 className="text-base text-center">{banner.title}</h1>
      <div className="h-full w-full flex items-center justify-center">
        <img src={banner.image.url} alt="Banner" height={50} width={100} />
      </div>
      <h1 className="text-base text-center">{banner.status}</h1>
      <div className="flex items-center justify-center gap-2 text-center">
        <Link href={`/banner/edit/${banner._id}`}>
          <MdEdit size={20} />
        </Link>
        <MdDelete size={20} onClick={() => handleDeleteClick(banner._id)} />
      </div>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md">
      <div className="py-3 px-8 flex justify-between items-center text-xl w-full  border-none rounded-sm shadow-sm bg-headerBG">
        <h1 className="text-textBlack">Banner List</h1>
        <LinkButton url="/banner/add" value="Add New Banner" />
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center px-6 w-full border-none rounded-sm shadow-sm bg-headerBG">
        <div className="py-3 flex items-center gap-2">
          <h1 className="text-textBlack">Show Entries</h1>
          <ShowNum />
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="outline-none border-gray-200 shadow-sm"
            placeholder="Search Banner..."
          />
        </form>
      </div>

      {/* Table Headers */}
      <div className="py-3 grid grid-cols-[40px_1fr_200px_1fr_1fr] text-textBlack opacity-70 border-b-[1px] border-none">
        <h1 className="text-base text-center">No.</h1>
        <h1 className="text-base text-center">Title</h1>
        <h1 className="text-base text-center">Banner Image</h1>
        <h1 className="text-base text-center">Status</h1>
        <h1 className="text-base text-center">Action</h1>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Display Banners */}
      <div>
        {searchResults.length ? (
          searchResults.map((banner, index) => (
            <BannerRow key={banner._id} banner={banner} index={index} />
          ))
        ) : (
          <p>No banners found for "{search}".</p>
        )}
      </div>

      {/* Pagination */}
      {data.length > 0 && (
        <div className="mt-4">
          <ReactPaginate
            className="h-full w-full flex flex-wrap items-center justify-end gap-4 pr-14"
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
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded shadow-sm w-96 z-50">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this banner?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
              <button
                className="bg-buttonBG text-white px-4 py-2 rounded"
                onClick={deleteBanner}
              >
                Yes
              </button>
            </div>
          </div>
          <div className="fixed inset-0 bg-gray-700 opacity-10 z-40"></div>
        </div>
      )}
    </div>
  );
};

export default ListBanner;
