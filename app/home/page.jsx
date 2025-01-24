'use client'
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

export default function AddData() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
    });
    const [Loader, setLoader] = useState(false)

    const [data, setData] = useState(null);  // State to hold the fetched data

    useEffect(() => {
        handleGetData();
    }, []); // Empty dependency array to call once on mount

    const handleGetData = async () => {
        try {
            const response = await fetch('/api/getdata', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setData(data);  // Store the fetched data in state
        } catch (error) {
            console.error('Error fetching data:', error);
            setResponseMessage('Failed to fetch data.');
        }
    };



    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        try {
            const response = await fetch('/api/addData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            handleGetData()
            setFormData({
                name: "",
                description: "",
                image: "",
                _id: ""
            })
            setLoader(false)
            setResponseMessage(data.message);
        } catch (error) {
            console.error('Error submitting data:', error);
            setResponseMessage('Failed to add data.');
        }
    };

    const handleEditData = (data) => {
        setFormData({
            name: data?.name,
            description: data?.description,
            image: data?.image,
            _id: data?._id
        })
    }

    const handleDeleteData = async (id) => {
        try {
            const response = await fetch('/api/deleteData', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Pass the id of the document to delete
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            if (result) {
                handleGetData()
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };
    return (
        <section className="bg-white">
            <div className="grid items-start grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24" style={{ position: 'sticky', top: "0" }}>
                    <div className="xl:w-full">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Add Your Data</h2>
                        <p className="mt-2 text-base text-gray-600">Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.</p>

                        <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Enter Image URL </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="url"
                                            placeholder="Enter image url"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            required
                                            className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Name </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            placeholder="Enter name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900"> Description </label>
                                    </div>
                                    <div className="mt-2.5">
                                        <textarea
                                            type="text"
                                            placeholder="Enter your description"
                                            value={formData.description}
                                            name="description"
                                            onChange={handleChange}
                                            required
                                            className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">{Loader ? "Loading..." : "Submit Data"}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
                    <section className="py-0 bg-gray-50">
                        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                            <div className="grid max-w-md grid-cols-1 gap-6 mx-auto lg:grid-cols-2 lg:max-w-full">
                                {data?.data?.map((item, index) => {
                                    return (
                                        <div className="overflow-hidden bg-white rounded shadow" key={index}>
                                            <div className="p-5">
                                                <div className="relative">
                                                    <img className="object-cover w-full h-full" src={item?.image} alt="" />
                                                </div>
                                                <p className="mt-5 text-2xl font-semibold">
                                                    {item?.name}
                                                </p>
                                                <p className="mt-4 text-base text-gray-600">{item?.description}</p>

                                                <div className='flex gap-4 mt-4'>
                                                    <p className='font-bold cursor-pointer' onClick={() => handleEditData(item)}>Edit</p>
                                                    <p className='font-bold cursor-pointer' onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDeleteData(item?._id);
                                                    }}>Delete</p>
                                                </div>
                                            </div>
                                        </div>)
                                })}
                            </div>

                            <div className="flex items-center justify-center mt-8 space-x-3 lg:hidden">
                                <button type="button" className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button type="button" className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </section>

    );
}
