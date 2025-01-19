"use client";
import LinkButton from "@/components/LinkButton";
import { testimonialStatushandler } from "@/store/Actions/adminActions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

const ServiceList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [deleted, setDelete] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTestimonialId, setSelectedTestimonialId] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/fetchTestimonials?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Testimonials");
      }
      const data = await response.json();
      setData(data.data);
      console.log(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteClick = (id) => {
    console.log(id);

    setSelectedTestimonialId(id);
    setShowModal(true);
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteTestimonials/${selectedTestimonialId}`
      );
      if (response.ok) {
        setShowModal(false); // Close the modal after successful deletion
        if (search) {
          setSearchResults((prevResults) =>
            prevResults.filter(
              (Testimonial) => Testimonial._id !== selectedTestimonialId
            )
          );
        } else {
          setData((prevData) =>
            prevData.filter(
              (Testimonial) => Testimonial._id !== selectedTestimonialId
            )
          );
        }
      }
    } catch (err) {
      console.error("Error deleting subcategory:", err.message);
    }
  };

  const SearchHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/searchTestimonials/${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to search Testimonials");
      }
      const result = await response.json();
      setSearchResults(result.data);
      // console.log(searchResults);
      // setSearch("")
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTestimonials();
    setDelete(false);
  }, [deleted]);

  const handleTestimonialStatus = async (status, id) => {
    const formdata = new FormData();
    formdata.append("status", status);
    formdata.append("id", id);
    await dispatch(testimonialStatushandler(formdata));
    fetchTestimonials();
  };

  useEffect(() => {
    fetchTestimonials();
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
    <div className="h-full w-full flex flex-col py-10 px-14 gap-10 bg-formBG rounded-md">
      <div className="py-4 px-8 flex justify-between text-xl items-center w-full border-none bg-headerBG shadow-sm">
        <h4>Testimonial List</h4>
        <LinkButton url='/testimonial/add' value="Add Testimonial" />
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center px-6 w-full border-none bg-headerBG shadow-sm">
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
            placeholder="Search Testimonial..."
            className="outline-none border-[1px] border-gray-200 shadow-sm"
          />
          <button className="bg-[royalblue] p-2 text-white" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* Table Headers */}
      <div className="py-3 w-full grid grid-cols-[40px_1fr_150px_250px_70px_120px_80px]  opacity-70 border-b-[1px] border-gray-200">
        <h1 className="text-base text-center">No.</h1>
        <h1 className="text-base text-center">Name</h1>
        <h1 className="text-base text-center ">Image</h1>
        <h1 className="text-base text-center">Comment</h1>
        <h1 className="text-base text-center ">Rating</h1>
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
                className="w-full py-3 grid grid-cols-[40px_1fr_150px_250px_70px_120px_80px] border-b-[1px] border-gray-100"
              >
                <h1 className="text-base text-center ">{index + 1}</h1>
                <h1 className="text-base text-center">
                  {elem?.user?.name || elem?.name || "none"}
                </h1>
                <div className="h-full w-full flex items-center justify-center ">
                  <img src={elem?.image?.url || elem?.user?.image?.url} alt="" height={60} width={100} />
                </div>
                <h1 className="text-base text-center ">{elem.paragraph}</h1>
                <h1 className="text-base text-center ">{elem.rating}</h1>
                {/* <h1 className='text-base text-center '>{elem.status}</h1> */}
                <h1 className=" text-center text-sm ">
                  {elem.status === "Publish" ? (
                    <button
                      onClick={() => {
                        handleTestimonialStatus("Unpublish", elem._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleTestimonialStatus("Publish", elem._id);
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Publish
                    </button>
                  )}
                </h1>
                <div className="flex items-center justify-center gap-2 text-center">
                  {/* <Link href={`/subcategory/edit/${elem._id}`}><MdEdit size={20} /></Link> */}
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
                      <p>Are you sure you want to delete this testimonial?</p>
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
            <p>No testinomial found for "{search}".</p>
          )
        ) : data.length > 0 ? (
          <div>
            {data.map((elem, index) => (
              <div
                key={index}
                className="w-full py-3 grid grid-cols-[40px_1fr_150px_250px_70px_120px_80px] items-center border-b-[1px] border-gray-100"
              >
                {/* Index */}
                <h1 className="text-base text-center">{index + 1}</h1>

                {/* User name fallback */}
                <h1 className="text-base text-center">
                  {elem?.user?.name || elem?.name || "none"}
                </h1>

                {/* Image */}
                <div className="h-full w-full flex items-center justify-center">
                  <img src={elem?.image?.url || elem?.user?.image?.url} alt="" height={60} width={100} />

                  {/* {elem.image?.url && elem.user.image.url ? (
                    <img src={elem.image.url || elem.user.image.url} alt="" height={60} width={100} />
                  ) : (
                    <div className="text-gray-400">No Image</div>
                  )} */}
                </div>

                {/* Paragraph */}
                <h1 className="text-base text-center">
                  {elem.paragraph || ""}
                </h1>

                {/* Rating */}
                <h1 className="text-base text-center">{elem.rating || ""}</h1>

                {/* Status */}
                <h1 className="text-center text-sm">
                  {elem.status === "Publish" ? (
                    <button
                      onClick={() => {
                        handleTestimonialStatus("Unpublish", elem._id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleTestimonialStatus("Publish", elem._id);
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Publish
                    </button>
                  )}
                </h1>

                {/* Actions */}
                <div className="flex items-center justify-center gap-2 text-center">
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
                      <p>Are you sure you want to delete this testimonial?</p>
                      <div className="flex justify-end gap-4 mt-6">
                        <button
                          className="bg-gray-200 px-4 py-2 rounded"
                          onClick={() => setShowModal(false)}
                        >
                          No
                        </button>
                        <button
                          className="bg-buttonBG text-white px-4 py-2 rounded"
                          onClick={deleteHandler}
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
          <div className="text-center py-4 text-gray-500">
            No testimonials found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
