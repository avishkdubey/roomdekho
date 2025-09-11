import { faHouseCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import googleIcon from '../../assets/images/icons8-google-48.png';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [loginStep, setLoginStep] = useState<'email' | 'otp'>('email');

    const handleGetOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginStep('otp');
    };
    
    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Logged in successfully! (Static Demo)');
        onClose();
    };
    
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => setLoginStep('email'), 300);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div 
                className={`bg-white rounded-xl shadow-2xl w-full max-w-4xl flex overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full md:w-1/2 p-8 md:p-12 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                    <div className={`transition-all duration-300 ease-in-out ${loginStep === 'email' ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-full absolute'}`}>
                        <h2 className="text-3xl font-bold text-gray-800">Login</h2>
                        <p className="text-gray-500 mt-2">Welcome back! Please enter your details.</p>
                        <form onSubmit={handleGetOtp} className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input id="email" type="email" required placeholder="you@example.com" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                            </div>
                            <button type="submit" className="w-full py-3 px-4 text-lg font-semibold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors">Get OTP</button>
                            <div className="text-center text-gray-400">or</div>
                            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 px-4 text-lg font-semibold text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                                <img src={googleIcon} alt="Google" className="w-6 h-6" /> Continue with Google
                            </button>
                        </form>
                    </div>
                    <div className={`transition-all duration-300 ease-in-out ${loginStep === 'otp' ? 'opacity-100 transform-none' : 'opacity-0 translate-x-full absolute'}`}>
                        <h2 className="text-3xl font-bold text-gray-800">Enter OTP</h2>
                        <p className="text-gray-500 mt-2">A 5-digit code has been sent to your email.</p>
                        <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Verification Code</label>
                                <input id="otp" type="text" required maxLength={5} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                            </div>
                            <button type="submit" className="w-full py-3 px-4 text-lg font-semibold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors">Verify</button>
                            <button type="button" onClick={() => setLoginStep('email')} className="text-center w-full text-yellow-600 hover:underline">Back to login</button>
                        </form>
                    </div>
                </div>
                <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-12 flex-col text-center">
                    <FontAwesomeIcon icon={faHouseCircleCheck} className="text-6xl text-red-800" />
                    <h1 className="text-4xl font-bold mt-6">Your Trusted</h1>
                    <h2 className="text-2xl font-bold">R<span className="text-yellow-500">oo</span>mDekh<span className="text-yellow-500">a</span>.com</h2>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
