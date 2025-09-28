import { Bell, Building2, Home, LogIn, Menu, Plus, Search, User, Users, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Define the props interface for the Header component
interface HeaderProps {
    openLoginModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openLoginModal }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleHomeClick = () => {};

    // Detect scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-lg shadow-2xl border-b border-purple-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo Section */}
                        <div className="flex items-center space-x-4">
                            <button onClick={handleHomeClick} className="flex items-center space-x-3 group">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center group-hover:rotate-3">
                                        <img 
                                            src="/logo.png" 
                                            alt="Logo" 
                                            className="w-8 h-8 object-contain"
                                            onError={(e) => {
                                                // Fallback if logo.png doesn't exist
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.nextElementSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div className="w-8 h-8 hidden items-center justify-center">
                                            <Building2 className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                                        RoomDekho
                                    </h1>
                                    <p className="text-xs text-gray-400 -mt-1">Premium Properties</p>
                                </div>
                            </button>
                        </div>

                        {/* Search Bar (Desktop) */}
                        {/* <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search properties, locations, or amenities..."
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-purple-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                />
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                    <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-xl text-sm font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div> */}

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            <NavItem href="/" icon={Home} label="Home" />
                            <NavItem href="/#flats" icon={Building2} label="Properties" />
                            <NavItem href="/about" icon={Users} label="About" />
                            
                            {/* Notification Bell */}
                            <button className="relative p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Notifications
                                </div>
                            </button>

                            {/* Login Button */}
                            <button 
                                onClick={openLoginModal}
                                className="flex items-center space-x-2 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group"
                            >
                                <LogIn className="w-4 h-4" />
                                <span className="font-medium">Login</span>
                            </button>

                            {/* Add Property Button */}
                            <Link to={'/list-property'}><button className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                <Plus className="w-4 h-4" />
                                <span>List Property</span>
                            </button></Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center space-x-3 lg:hidden">
                            {/* Mobile Search Button */}
                            <button 
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            
                            {/* Mobile Menu Button */}
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${isSearchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-4 pb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search properties..."
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-500 ${
                                    scrolled 
                                        ? 'bg-white/5 border-white/20' 
                                        : 'bg-white/10 border-purple-500/30'
                                }`}
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${isMenuOpen ? 'opacity-100 backdrop-blur-sm' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/30" onClick={() => setIsMenuOpen(false)}></div>
                <div className={`absolute right-0 top-0 h-full w-80 max-w-sm bg-gradient-to-b from-slate-900 via-purple-900/90 to-slate-900 shadow-2xl transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-purple-500/30">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">RoomDekho</h2>
                                <p className="text-xs text-gray-400">Premium Properties</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Menu Items */}
                    <div className="py-6">
                        <div className="px-6 mb-4">
                            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Guest User</p>
                                    <p className="text-xs text-gray-400">Login to access more features</p>
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-1 px-3">
                            <MobileNavItem href="/" icon={Home} label="Home" onClick={() => setIsMenuOpen(false)} />
                            <MobileNavItem href="/#flats" icon={Building2} label="Properties" onClick={() => setIsMenuOpen(false)} />
                            <MobileNavItem href="/about" icon={Users} label="About Us" onClick={() => setIsMenuOpen(false)} />
                            <li>
                                <button 
                                    onClick={() => { setIsMenuOpen(false); openLoginModal(); }}
                                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group"
                                >
                                    <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">Login</span>
                                </button>
                            </li>
                        </ul>

                        <div className="px-6 mt-6">
                            <Link to={'/list-property'}><button 
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                            >
                                <Plus className="w-4 h-4" />
                                <span>List Your Property</span>
                            </button></Link>
                        </div>

                        {/* Quick Stats */}
                        <div className="px-6 mt-6">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="text-center p-3 bg-white/5 rounded-xl">
                                    <p className="text-2xl font-bold text-amber-400">1K+</p>
                                    <p className="text-xs text-gray-400">Properties</p>
                                </div>
                                <div className="text-center p-3 bg-white/5 rounded-xl">
                                    <p className="text-2xl font-bold text-green-400">500+</p>
                                    <p className="text-xs text-gray-400">Happy Clients</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Desktop Navigation Item Component
const NavItem: React.FC<{ href: string; icon: any; label: string }> = ({ href, icon: Icon, label }) => (
    <a 
        href={href}
        className="flex items-center space-x-2 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group relative"
    >
        <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span className="font-medium">{label}</span>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {label}
        </div>
    </a>
);

// Mobile Navigation Item Component
const MobileNavItem: React.FC<{ href: string; icon: any; label: string; onClick: () => void }> = ({ 
    href, 
    icon: Icon, 
    label, 
    onClick 
}) => (
    <li>
        <a 
            href={href}
            onClick={onClick}
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group"
        >
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{label}</span>
        </a>
    </li>
);

export default Header;
