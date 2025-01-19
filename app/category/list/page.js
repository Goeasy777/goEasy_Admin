"use client";
import LinkButton from "@/components/LinkButton";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { FaList } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import ReactPaginate from "react-paginate";

const page = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  // const [deleted, setDelete] = useState(false)

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getCategoryForD?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setData(data.category);
      setTotalPages(data.totalPages);
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/searchCategory/${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to search category");
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
    setSelectedCategoryId(id);
    setShowModal(true);
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteCategory/${selectedCategoryId}`
      );
      if (response.ok) {
        setShowModal(false); // Close the modal after successful deletion
        if (search) {
          setSearchResults((prevResults) =>
            prevResults.filter(
              (category) => category._id !== selectedCategoryId
            )
          );
        } else {
          setData((prevData) =>
            prevData.filter((category) => category._id !== selectedCategoryId)
          );
        }
      }
    } catch (err) {
      console.error("Error deleting category:", err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
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
      {/* Heading */}
      <div className="py-3 px-8 flex justify-between items-center text-xl w-full border-none shadow-sm rounded-sm bg-headerBG">
        <h2 className="text-textBlack">Category List</h2>
        <LinkButton url="/category/add" value="Add New Category" />
      </div>

      <div className="flex justify-between items-center px-6 w-full border-none shadow-sm rounded-sm bg-headerBG">
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
            placeholder="Search Category..."
          />
          <button className="bg-searchBG p-2 text-textWhite" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="py-3 text-textBlack w-full grid grid-cols-[40px_1fr_1fr_200px_1fr_1fr]  opacity-70 border-b-[1px] border-none">
        <h1 className="text-base text-center">No.</h1>
        <h1 className="text-base text-center">Main Category</h1>
        <h1 className="text-base text-center">Category Subtitle</h1>
        <h1 className="text-base text-center">Category Image</h1>
        <h1 className="text-base text-center">Status</h1>
        <h1 className="text-base text-center">Action</h1>
      </div>

      {/* Display Search Results if search is active, otherwise display all categories */}
      <div>
        {search ? (
          searchResults.length ? (
            searchResults.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3 text-textBlack grid items-center grid-cols-[40px_1fr_1fr_200px_1fr_1fr] border-b-[1px] border-gray-100 "
              >
                <h1 className="text-base text-center">{index + 1}</h1>
                <h1 className="text-base text-center">{elem.category}</h1>
                <h1 className="text-base text-center">{elem.subtitle}</h1>
                <div className="h-full w-full flex items-center justify-center">
                  <img src={elem.image.url} alt=""  height={100} width={100} />
                </div>
                <h1 className="text-base text-center ">{elem.status}</h1>

                <div className="flex items-center justify-center gap-2 text-center">
                  <Link href={`/category/edit/${elem._id}`}>
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
                      <p>Are you sure you want to delete this category?</p>
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
            <p>No categories found for "{search}".</p>
          )
        ) : data && data.length > 0 ? (
          <div>
            {data.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3 text-textBlack items-center grid grid-cols-[40px_1fr_1fr_200px_1fr_1fr] border-b-[1px] border-gray-100 "
              >
                <h1 className="text-base text-center">{index + 1}</h1>
                <h1 className="text-base text-center">{elem.category}</h1>
                <h1 className="text-base text-center">{elem.subtitle}</h1>
                <div className="flex items-center justify-center">
                  <img src={elem.image.url} alt=""   height={100} width={100}
                   />
                </div>
                <h1 className="text-base text-center ">{elem.status}</h1>

                <div className="flex items-center justify-center gap-2 text-center">
                  <Link href={`/category/edit/${elem._id}`}>
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
                      <p>Are you sure you want to delete this category?</p>
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
                // activeClassName="bg-blue-500 text-white px-2 py-1 rounded"
                activeLinkClassName="bg-blue-500 text-white px-2 py-1 rounded"
              />
            </div>
          </div>
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default page;
