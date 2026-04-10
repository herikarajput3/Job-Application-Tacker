import React, { useState } from 'react'
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-white shadow-sm">
            {/* Top Row */}
            <div className='max-w-6xl mx-auto flex justify-between items-center border-b border-gray-300 px-6 py-4'>

                {/* Logo */}
                <div className='text-md md:text-3xl tracking-wider' style={{ fontFamily: "Pacifico" }}>
                    Job<span className='text-blue-700'>Tracker</span>
                </div>

                {/* Desktop Links */}
                <div className='hidden md:flex gap-8 text-gray-700 font-medium'>
                    <div className='cursor-pointer hover:text-blue-700'>Dashboard</div>
                    <div className='cursor-pointer hover:text-blue-700'>Applications</div>
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

            {isOpen && (
                <div className='md:hidden bg-white border-b border-gray-200 shadow-sm'>
                    <ul className='flex flex-col p-4 gap-4 text-gray-700 font-medium'>
                        <li className='cursor-pointer hover:text-blue-700'>Dashboard</li>
                        <li className='cursor-pointer hover:text-blue-700'>Applications</li>
                    </ul>
                </div>
            )}

        </nav>
    );
};

export default Navbar