import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinkStyle = ({ isActive }) =>
        `cursor-pointer px-3 py-2 transition ${isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-500"
        }`;


    return (
        <nav className="bg-white shadow-sm sticky top-0">
            {/* Top Row */}
            <div className='max-w-5xl mx-auto flex justify-between items-center border-b border-gray-300 px-6 py-4'>

                {/* Logo */}
                <div className='text-md md:text-3xl font-semibold' style={{ fontFamily: "Inter" }}>
                    Job<span className='text-blue-700'>Tracker</span>
                </div>

                {/* Desktop Links */}
                <div className='hidden md:flex gap-8 text-gray-700 font-medium'>
                    <NavLink to="/" className={navLinkStyle}>Dashboard</NavLink>
                    <NavLink to="/applications" className={navLinkStyle}>Applications </NavLink>
                    
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='text-2xl'
                    >
                        {isOpen ? (<HiX />) : (<HiMenu />)}
                    </button>
                </div>
            </div>

            {/* Dropdown Menu */}

            {
                isOpen && (
                    <div className='md:hidden bg-white border-b border-gray-200 shadow-sm'>
                        <ul className='flex flex-col p-4 gap-2 text-gray-700 font-medium'>
                            <NavLink to="/" className='cursor-pointer hover:text-blue-700'>Dashboard</NavLink>
                            <NavLink to="/applications" className='cursor-pointer hover:text-blue-700'>Applications</NavLink>
                        </ul>
                    </div>
                )
            }

        </nav >
    );
};

export default Navbar