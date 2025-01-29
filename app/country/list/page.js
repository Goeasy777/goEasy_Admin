"use client";
import LinkButton from '@/components/LinkButton';
import { searchcity } from '@/store/Actions/adminActions';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdEditSquare, MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';

const page = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [deleted, setDelete] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();

    const fetchCities = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getCity`);
            if (!response.ok) {
                throw new Error('Failed to fetch cities');
            }
            const data = await response.json();
            setData(data.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const SearchHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/searchCity/${search}`);
            if (!response.ok) {
                throw new Error('Failed to search cities');
            }
            const result = await response.json();
            setSearchResults(result.data);
            // setSearch("")
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteHandler = async (id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteCity/${id}`);
            setDelete(true)
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        fetchCities();
        setDelete(false)
    }, [deleted]);

    const ShowNum = () => {
        return <div className='flex flex-col gap-4' style={{}}>
            <select className='shadow-sm' >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    }

    return (
        <div className='h-full w-full flex flex-col  py-10 px-14 gap-10'>

            <div className='py-3 px-8 flex justify-between items-center text-2xl w-full border-[1px] border-gray-200 shadow-sm'>

                <h1>List Country Code</h1>

                {/* <Button color="primary" variant="shadow" className='bg-[royalblue] outline-none text-white py-2 px-6 text-base rounded-md'>
                    <Link href='/city/add'>Add New City</Link>
                </Button> */}
                <LinkButton url='/country/add' value='Add New Country Code' />

            </div>


            <div className='flex justify-between items-center px-6 w-full border-[1px] border-gray-200 shadow-sm'>
                <div className='py-3 flex items-center gap-4 '>
                    <h1>Show Entries</h1>
                    <ShowNum />
                </div>
                <form onSubmit={SearchHandler}>
                    <input
                        type="search"
                        // value={search}
                        // onChange={(e) => setSearch(e.target.value)}
                        name='search'
                        className='outline-none border-[1px] border-gray-200 shadow-sm'
                        placeholder='Search Country Code...'
                    />
                    <button className='bg-[royalblue] p-2 text-white' type="submit">Search</button>

                </form>
            </div>

            {/* Table Headers */}
            <div className='py-3 grid grid-cols-[1fr_1fr_1fr_1fr] opacity-70 border-b-[1px] border-gray-200'>
                <h1 className='text-base text-center'>No.</h1>
                <h1 className='text-base text-center'>Country Code</h1>
                <h1 className='text-base text-center'> Status</h1>
                <h1 className='text-base text-center'>Action</h1>
            </div>

            {/* Display Error if any */}
            {error && <p className='text-red-500'>{error}</p>}

            {/* Display Search Results if search is active, otherwise display all cities */}
            <div>
                {search ? (
                    searchResults.length ? (
                        searchResults.map((elem, index) => (
                            <div key={index} className='w-full py-3 flex items-center justify-between border-b-[1px] border-gray-100'>
                                <h1 className='text-base text-center w-1/5'>{index + 1}</h1>
                                <h1 className='text-base text-center w-1/5'>{elem.city}</h1>
                                <h1 className='text-base text-center w-1/5'>{elem.status}</h1>
                                <div className='flex items-center justify-center gap-2 w-1/5 text-center' onClick={() => deleteHandler(elem._id)}>
                                    <MdDelete size={20} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No cities found for "{search}".</p>
                    )
                ) : (
                    data.length > 0 ? (
                        data.map((elem, index) => (
                            <div key={index} className='w-full py-3 flex items-center justify-between border-b-[1px] border-gray-100'>
                                <h1 className='text-base text-center w-1/5'>{index + 1}</h1>
                                <h1 className='text-base text-center w-1/5'>{elem.city}</h1>
                                <h1 className='text-base text-center w-1/5'>{elem.status}</h1>
                                <div className='flex items-center justify-center gap-2 w-1/5 text-center' onClick={() => deleteHandler(elem._id)}>
                                    <MdDelete size={20} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Country code found.</p>
                    )
                )}
            </div>
        </div >
    );
};

export default page;
