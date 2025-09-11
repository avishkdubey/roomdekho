import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="py-10 text-white bg-gray-800">
            <div className="container px-4 mx-auto">
                {/* Social Icons */}
                <div className="flex justify-center gap-6 mb-8 text-2xl">
                    <a href="#!" className="hover:text-yellow-400"><FontAwesomeIcon icon={faFacebookF} /></a>
                    <a href="#!" className="hover:text-yellow-400"><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="#!" className="hover:text-yellow-400"><FontAwesomeIcon icon={faGoogle} /></a>
                    <a href="#!" className="hover:text-yellow-400"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="#!" className="hover:text-yellow-400"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    <a href="#!" className="hover:text-yellow-400"><FontAwesomeIcon icon={faGithub} /></a>
                </div>
                
                {/* Newsletter */}
                <section className="py-8 border-t border-b border-gray-700">
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center gap-4 md:flex-row">
                        <p className="m-0 font-semibold">Sign up for our newsletter</p>
                        <input type="email" placeholder="Email address" className="px-4 py-2 text-gray-800 bg-white border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                        <button type="submit" className="px-6 py-2 font-semibold text-white bg-yellow-500 border border-yellow-500 rounded-md hover:bg-yellow-600">
                            Subscribe
                        </button>
                    </form>
                </section>

                {/* Footer Links */}
                <section className="grid grid-cols-2 gap-8 py-10 text-center md:grid-cols-4 md:text-left">
                    <div>
                        <h5 className="mb-4 font-bold uppercase">Popular Searches</h5>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#!" className="hover:text-white">1BHK</a></li>
                            <li><a href="#!" className="hover:text-white">2BHK</a></li>
                            <li><a href="#!" className="hover:text-white">1RK</a></li>
                            <li><a href="#!" className="hover:text-white">For Students</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="mb-4 font-bold uppercase">Quick Links</h5>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#!" className="hover:text-white">Terms of Use</a></li>
                            <li><a href="#!" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#!" className="hover:text-white">Our Services</a></li>
                            <li><a href="#!" className="hover:text-white">FAQs</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="mb-4 font-bold uppercase">Discover</h5>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#!" className="hover:text-white">Rooms</a></li>
                            <li><a href="#!" className="hover:text-white">Flats</a></li>
                            <li><a href="#!" className="hover:text-white">Villas</a></li>
                            <li><a href="#!" className="hover:text-white">Mansions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="mb-4 font-bold uppercase">Social Media</h5>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#!" className="hover:text-white">Instagram</a></li>
                            <li><a href="#!" className="hover:text-white">Facebook</a></li>
                            <li><a href="#!" className="hover:text-white">LinkedIn</a></li>
                            <li><a href="#!" className="hover:text-white">Twitter</a></li>
                        </ul>
                    </div>
                </section>

                {/* Copyright */}
                <div className="py-4 mt-8 text-sm text-center text-gray-500 border-t border-gray-700">
                    © 2025 Copyright: RoomDekha.com
                </div>
            </div>
        </footer>
    );
};

export default Footer;
