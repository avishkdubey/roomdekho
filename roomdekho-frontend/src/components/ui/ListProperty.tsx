import React from 'react';

// You will need to add a video to your assets folder for the background
// import minimalistVideo from '../../assets/images/minimalist-video.mp4'; 

const ListProperty = () => {
    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            <div className="container mx-auto p-4 md:p-8">
                <div className="bg-white shadow-2xl rounded-lg overflow-hidden md:flex">
                    {/* Left Side: Video */}
                    <div className="hidden md:block md:w-1/3 bg-gray-200">
                        {/* <video autoPlay loop muted className="w-full h-full object-cover">
                            <source src={minimalistVideo} type="video/mp4" />
                        </video> */}
                        <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}></div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full md:w-2/3 p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-gray-800 text-center">
                            Hello! <span className="text-yellow-500">Welcome To RoomDekha</span>
                        </h2>
                        <p className="text-center text-gray-500 mt-2">Let's get you started with listing your property.</p>

                        <form className="mt-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" id="name" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>
                                <div>
                                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input type="date" id="dob" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>
                                <div>
                                    <label htmlFor="password_list" className="block text-sm font-medium text-gray-700">Create Password</label>
                                    <input type="password" id="password_list" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="tel" id="phone" maxLength={10} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address</label>
                                    <input type="text" id="address" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <button type="submit" className="px-8 py-3 text-lg font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProperty;
