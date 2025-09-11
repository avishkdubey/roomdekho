import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

// Define the props interface for the Header component
interface HeaderProps {
  scrollToTop: () => void;
  scrollToFlats: () => void;
  scrollToAboutUs: () => void;
  openLoginModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToTop, scrollToFlats, scrollToAboutUs, openLoginModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', action: scrollToTop },
    { name: 'Flats', action: scrollToFlats },
    { name: 'About Us', action: scrollToAboutUs },
    { name: 'Login', action: openLoginModal },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between w-full h-20 px-4 mx-auto bg-white/80 backdrop-blur-md shadow-md md:px-8">
        <div className="text-xl md:text-2xl font-bold z-50">
            <button onClick={scrollToTop}>R<span className="text-yellow-500">oo</span>mDekh<span className="text-yellow-500">a</span>.com</button>
        </div>

        {/* --- HAMBURGER MENU BUTTON (MOBILE ONLY) --- */}
        <div className="md:hidden z-50">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-700">
            <li><button onClick={scrollToTop} className="px-4 py-2 text-lg rounded-full hover:bg-yellow-400/50 transition-colors">Home</button></li>
            <li><button onClick={scrollToFlats} className="px-4 py-2 text-lg rounded-full hover:bg-yellow-400/50 transition-colors">Flats</button></li>
            <li><button onClick={scrollToAboutUs} className="px-4 py-2 text-lg rounded-full hover:bg-yellow-400/50 transition-colors">About Us</button></li>
            <li><button onClick={openLoginModal} className="px-4 py-2 text-lg rounded-full hover:bg-yellow-400/50 transition-colors">Login</button></li>
            <li><button className="px-5 py-2 text-lg font-semibold text-black bg-yellow-400 border border-black rounded-lg hover:bg-yellow-500 transition-colors">Add property</button></li>
        </ul>
        
        {/* --- MOBILE NAVIGATION MENU --- */}
        <div className={`md:hidden fixed inset-0 bg-white/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
            <div className={`absolute right-0 top-0 h-full w-3/4 max-w-xs bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
                {/* Mobile menu header */}
                <div className="flex items-center justify-between p-8 pb-14 border-b border-gray-100">
                </div>
                {/* Mobile menu items */}
                <ul className="flex flex-col py-6 space-y-2 bg-amber-50">
                    {menuItems.map((item, index) => (
                        <li key={item.name} className={`transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{transitionDelay: `${index * 50}ms`}}>
                            <button
                                 onClick={() => {
                                    setIsMenuOpen(false);
                                    item.action();
                                }}
                                 className="w-full text-left px-6 py-3 text-lg font-medium text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors border-l-4 border-transparent hover:border-yellow-400"
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                    {/* Add Property button in mobile menu */}
                    <li className={`px-6 mt-4 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{transitionDelay: '200ms'}}>
                        <button
                             onClick={() => setIsMenuOpen(false)}
                            className="w-full px-4 py-3 text-lg font-semibold text-gray-800 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors"
                        >
                            Add property
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );
};

export default Header;
