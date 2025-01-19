'use client'
import { addcity } from '@/store/Actions/adminActions';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Button, ButtonGroup } from "@nextui-org/button"
import Button from '@/components/Button'


const page = () => {

    const dispatch = useDispatch();

    const [city, setCity] = useState('');
    const [status, setStatus] = useState('');

    const addCityHandler = (e) => {
        // e.preventDefault();
        // const Acity = { city, status };
        // dispatch(addcity(Acity));
        // setCity("");
        // setStatus("")
    }

    return (
        <div className='h-full w-full flex flex-col py-10 px-14 gap-10'>

            <h1 className='py-4 px-6 text-2xl w-full border-[1px] border-gray-200 shadow-sm'>Add Country Code</h1>

            <form onSubmit={addCityHandler} className='flex flex-col gap-8 items-start'>

                <div className='flex flex-col h-fit w-full gap-2'>
                    <h4 className='ml-3 text-xl'>Country Code</h4>
                    <input
                        className='p-4 border-gray-200 shadow-sm'
                        type="text"
                        placeholder='Enter Country Code...'
                        // value={city}
                        // onChange={(e) => setCity(e.target.value)}
                    />
                </div>


                <div className='flex flex-col h-fit w-full gap-2'>
                    <h4 className='ml-3 text-xl'>Country Code Status</h4>
                    <select
                        className='p-4 border-gray-200 shadow-sm'
                        // value={status}
                        // onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Select status...</option>
                        <option value="Publish">Publish</option>
                        <option value="Unpublish">Unpublish</option>
                    </select>
                </div>

                {/* Use 'as' prop to make Button an HTML button element */}
                {/* <Button as="button" type="submit" className='mt-5 bg-[royalblue] outline-none text-white py-3 px-6 text-base rounded-md'>
                    Add City
                </Button> */}
                <Button props={"Add Country Code"} />

            </form>
        </div>
    )
}

export default page;
