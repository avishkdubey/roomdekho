// src/components/ui/Home.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Import components
// Header and Footer are now rendered globally in App.tsx
import AnimatedBox from './AnimatedBox';
import FadeInUpBox from './FadeInUpBox';
// Login modal is rendered globally in App.tsx

// Import assets
import abhishekImg from '../../assets/images/Abhishek.png';
import camerahomeImg from '../../assets/images/camerahome.jpeg';
import divyanshImg from '../../assets/images/divyansh.JPG';
import videoBg from '../../assets/images/Fin.mp4';
import houseIconImg from '../../assets/images/house-icon.jpeg';
import houserentImg from '../../assets/images/houserent.jpg';
import room1 from '../../assets/images/modern-living-room-decor-1366x768.webp';
import movingBg from '../../assets/images/moving1.webp';
import room2 from '../../assets/images/room2.webp';
import room3 from '../../assets/images/room3.jpeg';
import sidehouse1 from '../../assets/images/sidehouse1.jpeg';
import sidehouse2 from '../../assets/images/sidehouse2.jpeg';

// Icons
import { faCheck, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
    const location = useLocation();
    // local modal state removed; controlled globally

    // Refs for smooth scrolling
    const flatsRef = useRef<HTMLElement>(null);
    const aboutUsRef = useRef<HTMLElement>(null);

    const scrollToRef = (ref: React.RefObject<HTMLElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Modal handlers
    // no local modal handlers
    
    const scrollToHash = () => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // account for sticky header height
                setTimeout(() => window.scrollBy({ top: -80, behavior: 'instant' as ScrollBehavior }), 300);
            }
        }
    };

    useEffect(() => {
        // on mount and when hash changes
        scrollToHash();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.hash]);

    return (
        <div className="font-sans bg-white">

            {/* --- HERO SECTION --- */}
            <header className="relative flex items-center justify-center h-[90vh] overflow-hidden">
                <video autoPlay loop muted className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
                    <source src={videoBg} type="video/mp4" />
                </video>
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
                <div className="relative z-20 text-center px-4 w-full">
                    <h1 className="text-5xl lg:text-8xl font-extrabold tracking-wider text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>Flats <span className="text-yellow-300">nearby</span> you</h1>
                    
                    {/* --- ENHANCED SEARCH BAR --- */}
                    <div className="mt-10 w-full max-w-xl mx-auto">
                        <div className="relative flex items-center w-full p-2 bg-white/20 backdrop-blur-sm rounded-full shadow-lg border border-white/30">
                            <div className="pl-4 pr-2">
                                <FontAwesomeIcon icon={faSearch} className="text-gray-100 text-xl" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search by city, locality, or landmark..." 
                                className="w-full p-3 text-lg bg-transparent text-white placeholder-gray-200 focus:outline-none"
                            />
                            <button className="px-6 md:px-8 py-3 text-lg font-semibold text-gray-800 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors flex-shrink-0">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            <main className="container px-4 mx-auto">
                {/* --- SELLING OPTIONS --- */}
                <section className="grid items-center grid-cols-1 gap-12 px-4 py-16 md:py-20 md:grid-cols-2">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center md:text-left">Let's find the right<br /> selling option for you</h2>
                        <p className="mt-4 text-center text-gray-600 md:text-left">As the complexity of buildings to increase, the field of architecture.</p>
                        <ul className="mt-8 space-y-4">
                            <li className="flex items-center font-bold"><FontAwesomeIcon icon={faCheck} className="mr-3 text-green-600" /> Find excellent deals</li>
                            <li className="flex items-center font-bold"><FontAwesomeIcon icon={faCheck} className="mr-3 text-green-600" /> Friendly host & Fast support</li>
                            <li className="flex items-center font-bold"><FontAwesomeIcon icon={faCheck} className="mr-3 text-green-600" /> List your own property</li>
                        </ul>
                        <div className="mt-8 text-center md:text-left"><a href="#partner" className="inline-block px-8 py-3 font-bold text-black bg-yellow-300 rounded-full hover:bg-yellow-400 transition-transform hover:scale-105">Partner with us</a></div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <img src={sidehouse1} className="object-cover w-1/2 rounded-lg shadow-lg" alt="Side House 1" />
                        <img src={sidehouse2} className="object-cover w-1/2 mt-16 rounded-lg shadow-lg" alt="Side House 2" />
                    </div>
                </section>
                
                 {/* --- FEATURED ROOMS --- */}
                <section id="flats" ref={flatsRef} className="py-16 md:py-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-center">Featured <span className="text-gray-500">r<span className="text-red-800">oo</span>ms</span> recommendations</h2>
                    <p className="mt-2 text-center text-gray-500">Curated spaces, tailored for your comfort and style.</p>
                    <div className="grid grid-cols-1 gap-10 mt-12 md:grid-cols-2 lg:grid-cols-3">
                        <div className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer group transition-shadow duration-300 hover:shadow-2xl">
                            <div className="overflow-hidden"><img className="object-cover w-full h-56 transition-transform duration-500 ease-in-out group-hover:scale-110" src={room1} alt="1RK" /></div>
                            <div className="p-6"><h3 className="text-2xl font-bold">1RK</h3><p className="mt-2 text-gray-600">Perfect for singles or students. A compact, efficient living space.</p><button className="inline-block px-5 py-2 mt-4 text-sm font-semibold text-white bg-red-800 rounded-lg hover:bg-red-900">View Details</button></div>
                        </div>
                        <div className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer group transition-shadow duration-300 hover:shadow-2xl">
                            <div className="overflow-hidden"><img className="object-cover w-full h-56 transition-transform duration-500 ease-in-out group-hover:scale-110" src={room2} alt="1BHK" /></div>
                            <div className="p-6"><h3 className="text-2xl font-bold">1BHK</h3><p className="mt-2 text-gray-600">Ideal for couples or small families, offering a separate bedroom.</p><button className="inline-block px-5 py-2 mt-4 text-sm font-semibold text-white bg-red-800 rounded-lg hover:bg-red-900">View Details</button></div>
                        </div>
                        <div className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer group transition-shadow duration-300 hover:shadow-2xl">
                             <div className="overflow-hidden"><img className="object-cover w-full h-56 transition-transform duration-500 ease-in-out group-hover:scale-110" src={room3} alt="2BHK" /></div>
                            <div className="p-6"><h3 className="text-2xl font-bold">2BHK</h3><p className="mt-2 text-gray-600">Spacious living for families, with two bedrooms for comfort.</p><button className="inline-block px-5 py-2 mt-4 text-sm font-semibold text-white bg-red-800 rounded-lg hover:bg-red-900">View Details</button></div>
                        </div>
                    </div>
                </section>
            </main>

            {/* --- VIRTUAL TOUR --- */}
            <section className="py-16 md:py-20 bg-gray-100">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-red-800" style={{fontFamily: "Georgia, serif"}}>Virtual Tour</h2>
                    <h3 className="mt-2 text-lg md:text-xl text-gray-600" style={{fontFamily: "Georgia, serif"}}>Take a virtual tour before you book a room!</h3>
                    <p className="max-w-4xl mx-auto mt-6 text-base md:text-lg text-gray-700">Looking for a perfect spot ,where one could blow off some steam and literally feel like at home is a demanding task that involves a great deal of tiresome decision making. With help comes our "virtual tour" guide.</p>
                </div>
            </section>
            
            {/* --- CALL TO ACTION (BANNER) - ENHANCED --- */}
            <section className="h-[500px] bg-cover bg-fixed bg-center relative flex items-center justify-center text-center text-white px-4" style={{backgroundImage: `url(${movingBg})`}}>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                <div className="relative z-10">
                    <FadeInUpBox>
                        <h2 className="text-4xl md:text-5xl font-extrabold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                            Property You Won't Find Anywhere Else
                        </h2>
                        <p className="max-w-xl mx-auto mt-4 text-lg text-gray-200">
                            We will help you save your efforts and find the best room right at your fingertips! Join us and reclaim your precious time.
                        </p>
                        <button className="px-8 py-3 mt-8 font-bold text-black bg-yellow-300 rounded-full transition-all duration-300 hover:bg-yellow-400 hover:scale-110 hover:shadow-lg hover:shadow-yellow-300/50">
                            Book Now
                        </button>
                    </FadeInUpBox>
                </div>
            </section>
            
            {/* --- TAKE OUR REFERENCE (ANIMATED BOXES) --- */}
            <section ref={aboutUsRef} id="aboutus" className="py-16 md:py-20 overflow-x-hidden bg-gray-50">
                <h2 className="text-3xl md:text-4xl font-bold text-center">Take Our Reference</h2>
                <AnimatedBox direction="right">
                    <div className="grid items-center grid-cols-1 p-6 bg-white rounded-lg shadow-lg md:grid-cols-3 gap-6">
                        <div className="flex justify-center md:col-span-1"><img src={divyanshImg} className="object-cover border-4 border-yellow-300 rounded-full w-48 h-48" alt="Divyansh Vyas" /></div>
                        <div className="text-center md:col-span-2 md:text-left">
                            <h3 className="text-2xl md:text-3xl" style={{fontFamily: 'cursive'}}>Divyansh Vyas</h3>
                            <p className="mt-2 italic text-gray-600">"We are here to help you find the best rooms around you without any physical efforts and in lesser time!"</p>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 mt-4 font-bold text-black bg-yellow-300 rounded-full hover:bg-yellow-400">LinkedIn</a>
                        </div>
                    </div>
                </AnimatedBox>
                <AnimatedBox direction="left">
                    <div className="grid items-center grid-cols-1 p-6 bg-white rounded-lg shadow-lg md:grid-cols-3 gap-6">
                        <div className="flex justify-center md:col-span-1"><img src={abhishekImg} className="object-cover border-4 border-yellow-300 rounded-full w-48 h-48" alt="Abhishek Dubey" /></div>
                        <div className="text-center md:col-span-2 md:text-left">
                            <h3 className="text-2xl md:text-3xl" style={{fontFamily: 'cursive'}}>Abhishek Dubey</h3>
                            <p className="mt-2 italic text-gray-600">"Our platform simplifies the room-finding process, saving you valuable time and connecting you with trusted owners directly."</p>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 mt-4 font-bold text-black bg-yellow-300 rounded-full hover:bg-yellow-400">LinkedIn</a>
                        </div>
                    </div>
                </AnimatedBox>
            </section>
            
            {/* --- HOW WE CAN HELP SECTION --- */}
            <section className="py-16 md:py-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center">See How <span className="text-yellow-500">RoomDekha</span> Can Help</h2>
                <div className="grid grid-cols-1 gap-10 mt-12 md:grid-cols-3">
                    <div className="text-center transition-transform duration-300 transform bg-white border border-gray-200 rounded-lg shadow-md hover:-translate-y-2">
                        <div className="flex justify-center p-6">
                            <img src={houserentImg} className="object-cover w-32 h-32 rounded-full" alt="Give on Rent" />
                        </div>
                        <h3 className="text-2xl font-bold"><span className="text-yellow-500">Give</span> on Rent</h3>
                        <p className="p-6 text-gray-600">Easily list your property and connect with thousands of potential tenants.</p>
                    </div>
                    <div className="text-center transition-transform duration-300 transform bg-white border border-gray-200 rounded-lg shadow-md hover:-translate-y-2">
                        <div className="flex justify-center p-6">
                            <img src={houseIconImg} className="object-cover w-32 h-32 rounded-full" alt="Take on Rent" />
                        </div>
                        <h3 className="text-2xl font-bold">Take <span className="text-yellow-500">on</span> Rent</h3>
                        <p className="p-6 text-gray-600">Find your perfect room with our powerful search and virtual tour features.</p>
                    </div>
                    <div className="text-center transition-transform duration-300 transform bg-white border border-gray-200 rounded-lg shadow-md hover:-translate-y-2">
                        <div className="flex justify-center p-6">
                            <img src={camerahomeImg} className="object-cover w-32 h-32 rounded-full" alt="See What We Meant" />
                        </div>
                        <h3 className="text-2xl font-bold">See What <span className="text-yellow-500">We</span> Meant</h3>
                        <p className="p-6 text-gray-600">Experience properties like never before with our immersive virtual tours.</p>
                    </div>
                </div>
            </section>

            {/* LoginModal rendered in App */}
        </div>
    );
};

export default Home;
