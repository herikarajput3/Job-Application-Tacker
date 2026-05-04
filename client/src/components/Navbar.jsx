import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = ({ onAddClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinkStyle = ({ isActive }) =>
        `px-3 py-2 text-sm font-medium transition ${isActive
            ? "text-indigo-600"
            : "text-gray-600 hover:text-indigo-600"
        }`;


    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* Logo */}
                    <div className='text-xl md:text-2xl font-bold text-gray-900'>
                        Job<span className='text-indigo-600'>Tracker</span>
                    </div>

                    {/* Desktop Links */}
                    <div className='hidden md:flex items-center gap-8'>
                        <NavLink to="/" className={navLinkStyle}>Dashboard</NavLink>
                        <NavLink to="/applications" className={navLinkStyle}>Applications </NavLink>
                    </div>

                    {/* CTA Button (Desktop) */}
                    <div className='hidden md:block'>
                        <button
                            onClick={onAddClick}
                            className='bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition'
                        >
                            + Add Application
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label='Toggle menu'
                            className='text-2xl text-gray-700'
                        >
                            {isOpen ? (<HiX />) : (<HiMenu />)}
                        </button>
                    </div>
                </div>
            </div>

            {/* Dropdown Menu */}

            {isOpen && (
                <div className='md:hidden border-t bg-white border-gray-200'>
                    <div className='px-4 py-4 space-y-3'>
                        <NavLink
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className='block text-gray-700 hover:text-indigo-600'>Dashboard</NavLink>

                        <NavLink
                            to="/applications"
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-700 hover:text-indigo-600"
                        >
                            Applications
                        </NavLink>

                        <button
                            onClick={() => {
                                onAddClick();
                                setIsOpen(false);
                            }}
                            className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            + Add Application
                        </button>
                    </div>
                </div>
            )}
        </nav >
    );
};

export default Navbar