import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define the props interface for the Header component
interface HeaderProps {
    openLoginModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openLoginModal }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleHomeClick = () => {};

    // menu items defined inline in JSX for clarity

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between w-full h-20 px-4 mx-auto bg-white/80 backdrop-blur-md shadow-md md:px-8">
            <div className="text-xl md:text-2xl font-bold z-50">
                <button onClick={handleHomeClick}>R<span className="text-yellow-500">oo</span>mDekh<span className="text-yellow-500">a</span>.com</button>
            </div>

            {/* --- HAMBURGER MENU BUTTON (MOBILE ONLY) --- */}
            <div className="md:hidden z-50">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>
            </div>

            {/* --- DESKTOP NAVIGATION --- */}
            <ul className="hidden md:flex items-center space-x-8 text-gray-700">
                <li><Link to="/" className="px-4 py-2 text-lg rounded-full hover:bg-yellow-400/50 transition-colors">Home</Link></li>
                <li><Link to="/#flats" className="px-4 py-2 text-lg rounded-full hover:bg-yellow-400/50 transition-colors">Flats</Link></li>
                <li><Link to="/about" className="px-4 py-2 text-lg rounded-full hover:bg-yellow-400/50 transition-colors">About Us</Link></li>
                <li><button onClick={openLoginModal} className="px-4 py-2 text-lg rounded-full hover:bg-yellow-400/50 transition-colors">Login</button></li>
                <li><Link to="/list-property"><button className="px-5 py-2 text-lg font-semibold text-black bg-yellow-400 border border-black rounded-lg hover:bg-yellow-500 transition-colors">Add property</button></Link></li>
            </ul>
            
            {/* --- MOBILE NAVIGATION MENU --- */}
            <div className={`md:hidden fixed inset-0 bg-white/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
                <div className={`absolute right-0 top-0 h-full w-3/4 max-w-xs bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <div className="text-lg font-bold text-gray-800">R<span className="text-yellow-500">oo</span>mDekh<span className="text-yellow-500">a</span>.com</div>
                        <button onClick={() => setIsMenuOpen(false)} className="p-2 text-xl text-gray-600 hover:text-gray-800 focus:outline-none" aria-label="Close menu"><FontAwesomeIcon icon={faTimes} /></button>
                    </div>
                    <ul className="flex flex-col py-6 space-y-2">
                        <li className={`transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{transitionDelay: `0ms`}}>
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="w-full block px-6 py-3 text-lg font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors border-l-4 border-transparent hover:border-yellow-400">Home</Link>
                        </li>
                        <li className={`transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{transitionDelay: `50ms`}}>
                            <Link to="/#flats" onClick={() => setIsMenuOpen(false)} className="w-full block px-6 py-3 text-lg font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors border-l-4 border-transparent hover:border-yellow-400">Flats</Link>
                        </li>
                        <li className={`transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{transitionDelay: `100ms`}}>
                            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="w-full block px-6 py-3 text-lg font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors border-l-4 border-transparent hover:border-yellow-400">About Us</Link>
                        </li>
                        <li className={`transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{transitionDelay: `150ms`}}>
                            <button onClick={() => { setIsMenuOpen(false); openLoginModal(); }} className="w-full text-left px-6 py-3 text-lg font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors border-l-4 border-transparent hover:border-yellow-400">Login</button>
                        </li>
                        <li className={`px-6 mt-4 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{transitionDelay: '200ms'}}>
                            <Link to="/list-property">
                            <button onClick={() => setIsMenuOpen(false)} className="w-full px-4 py-3 text-lg font-semibold text-gray-800 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors">Add property</button></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;

