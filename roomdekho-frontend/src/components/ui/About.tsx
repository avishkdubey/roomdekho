import React from 'react';
// Header and Footer are now rendered globally in App.tsx

// Assuming you have these assets in your assets folder
import documentImg from '../../assets/images/Document.png'; // Placeholder
import flatsImg from '../../assets/images/Flats.png'; // Placeholder
import partnerVideo from '../../assets/images/partner-video.mp4'; // Placeholder - replace with your video
import roomdekhaImg from '../../assets/images/RoomDekha.COm.png'; // Placeholder

import { faBriefcase, faCheck, faFileLines, faHouseFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

// Define the setPage prop type for navigation
const About: React.FC = () => {
    return (
        <div className="font-sans bg-white">
            {/* Header rendered in App */}

            {/* --- HERO SECTION --- */}
            <header className="relative flex items-center h-[80vh] overflow-hidden">
                <video autoPlay loop muted className="absolute z-0 top-0 left-0 w-full h-full object-cover">
                    <source src={partnerVideo} type="video/mp4" />
                </video>
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
                <div className="relative z-20 w-full">
                    <div className="container mx-auto px-4">
                        <div className="w-full md:w-1/2 lg:w-2/5">
                            <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg">
                                <h1 className="text-4xl font-bold text-gray-800">List a Room With Us</h1>
                                <p className="mt-2 text-gray-600">A simple and effective way to fill your rooms.</p>
                                <ul className="mt-6 space-y-3 text-gray-700">
                                    <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="mr-3 text-green-500" /> Only 100 rupees Listing Fee</li>
                                    <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="mr-3 text-green-500" /> Expand your accommodation portfolio</li>
                                    <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="mr-3 text-green-500" /> Enjoy personalized support</li>
                                </ul>
                                <Link to="/list-property"><button className="w-full mt-8 py-3 text-lg font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors">
                                    List Your Property
                                </button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container px-4 mx-auto">
                {/* --- WHY PARTNER --- */}
                <section className="py-16 md:py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">Why Partner With Us?</h2>
                    <p className="max-w-3xl mx-auto mt-4 text-gray-600">Reach out to the right audience, establish a brand, and yield the highest ROIs. Get started with your journey with RoomDekha.com today.</p>
                    <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
                        <div><h3 className="text-4xl font-bold text-yellow-500">25+</h3><p className="text-gray-500">Properties across Gwalior</p></div>
                        <div><h3 className="text-4xl font-bold text-yellow-500">100+</h3><p className="text-gray-500">Students Associated With Us</p></div>
                        <div><h3 className="text-4xl font-bold text-yellow-500">50+</h3><p className="text-gray-500">Students booked an accommodation</p></div>
                    </div>
                </section>
                
                {/* --- HOW IT WORKS --- */}
                <section className="py-16 md:py-20 bg-gray-50 -mx-4 px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center">How Does It Work?</h2>
                    <p className="max-w-3xl mx-auto mt-4 text-center text-gray-600">Getting seen by millions of students across the globe is now possible in just three simple steps.</p>
                    <div className="grid grid-cols-1 gap-12 mt-12 md:grid-cols-3">
                        <div className="text-center"><FontAwesomeIcon icon={faFileLines} className="text-4xl text-yellow-500" /><h3 className="mt-4 text-xl font-bold">Fill a Form</h3><p className="mt-2 text-gray-500">Fill out a simple contact form and get started instantly.</p></div>
                        <div className="text-center"><FontAwesomeIcon icon={faBriefcase} className="text-4xl text-yellow-500" /><h3 className="mt-4 text-xl font-bold">Get Contacted</h3><p className="mt-2 text-gray-500">We will contact you within 24 hours to finalize your onboarding.</p></div>
                        <div className="text-center"><FontAwesomeIcon icon={faHouseFlag} className="text-4xl text-yellow-500" /><h3 className="mt-4 text-xl font-bold">Enhance Your Offerings</h3><p className="mt-2 text-gray-500">Help students find safe, secure, and affordable homes easily.</p></div>
                    </div>
                </section>

                {/* --- WHAT YOU GET --- */}
                <section className="py-16 md:py-20">
                     <h2 className="text-3xl md:text-4xl font-bold text-center">What You Get</h2>
                     <p className="max-w-3xl mx-auto mt-4 text-center text-gray-600">Make the most out of this partnership and avail the benefits of the largest student services ecosystem right here!</p>
                    <div className="grid grid-cols-1 gap-10 mt-12 md:grid-cols-3">
                        <div className="overflow-hidden bg-white rounded-lg shadow-lg"><img className="object-cover w-full h-48" src={flatsImg} alt="Widget Integration" /><div className="p-6"><h3 className="text-xl font-bold">Widget Integration</h3><p className="mt-2 text-gray-600">Students can choose their preferred accommodation with just a click. Faster bookings for you!</p></div></div>
                        <div className="overflow-hidden bg-white rounded-lg shadow-lg"><img className="object-cover w-full h-48" src={documentImg} alt="Partner Dashboard" /><div className="p-6"><h3 className="text-xl font-bold">Dedicated Dashboard</h3><p className="mt-2 text-gray-600">Track every activity with a dedicated partner dashboard.</p></div></div>
                        <div className="overflow-hidden bg-white rounded-lg shadow-lg"><img className="object-cover w-full h-48" src={roomdekhaImg} alt="Prime Services" /><div className="p-6"><h3 className="text-xl font-bold">RoomDekha Prime</h3><p className="mt-2 text-gray-600">Unlock exclusive services and support to maximize your reach and earnings.</p></div></div>
                    </div>
                </section>

            </main>
            
            {/* LoginModal rendered in App */}
        </div>
    );
} 

export default About;
