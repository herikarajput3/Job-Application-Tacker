import React, { useState } from "react";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

import {
    HiMenu,
    HiX,
} from "react-icons/hi";

import {
    FiLogOut,
    FiPlus,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onAddClick }) => {

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [isOpen, setIsOpen] =
        useState(false);

    // Logout

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    // Nav Style

    const navLinkStyle = ({ isActive }) =>

        `relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
     
     ${isActive

            ? "text-indigo-600 bg-indigo-50"

            : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"

        }`;

    return (

        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    {/* ========================================= */}
                    {/* LEFT SIDE */}
                    {/* ========================================= */}

                    <div className="flex items-center gap-10">

                        {/* Logo */}

                        <div
                            onClick={() => navigate("/")}
                            className="cursor-pointer"
                        >

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">

                                Job
                                <span className="text-indigo-600">
                                    Tracker
                                </span>

                            </h1>

                        </div>

                        {/* Desktop Navigation */}

                        <div className="hidden md:flex items-center gap-2">

                            <NavLink
                                to="/"
                                className={navLinkStyle}
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/applications"
                                className={navLinkStyle}
                            >
                                Applications
                            </NavLink>

                        </div>

                    </div>

                    {/* ========================================= */}
                    {/* RIGHT SIDE */}
                    {/* ========================================= */}

                    <div className="hidden md:flex items-center gap-4">

                        {/* Add Button */}

                        <button
                            onClick={onAddClick}
                            className="
                inline-flex items-center gap-2
                bg-indigo-600 hover:bg-indigo-700
                text-white text-sm font-medium
                px-4 py-2.5 rounded-xl
                transition-all duration-200
                shadow-lg shadow-indigo-100
              "
                        >

                            <FiPlus size={16} />

                            Add Application

                        </button>

                        {/* Divider */}

                        <div className="w-px h-8 bg-gray-200" />

                        {/* User Section */}

                        <div className="flex items-center gap-3">

                            {/* Avatar */}

                            <div className="
                w-10 h-10 rounded-full
                bg-indigo-100 text-indigo-600
                flex items-center justify-center
                font-semibold text-sm
              ">

                                {user?.name?.[0]?.toUpperCase()}

                            </div>

                            {/* User Info */}

                            <div className="hidden lg:block">

                                <p className="text-sm font-medium text-gray-800">
                                    {user?.name}
                                </p>

                                <p className="text-xs text-gray-400">
                                    {user?.email}
                                </p>

                            </div>

                            {/* Logout */}

                            <button
                                onClick={handleLogout}
                                className="
                  p-2 rounded-xl
                  text-gray-500
                  hover:text-red-600
                  hover:bg-red-50
                  transition-all duration-200
                "
                            >

                                <FiLogOut size={18} />

                            </button>

                        </div>

                    </div>

                    {/* ========================================= */}
                    {/* MOBILE MENU BUTTON */}
                    {/* ========================================= */}

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="
              md:hidden
              w-10 h-10 rounded-xl
              flex items-center justify-center
              hover:bg-gray-100
              transition
            "
                    >

                        {isOpen
                            ? <HiX size={24} />
                            : <HiMenu size={24} />
                        }

                    </button>

                </div>

            </div>

            {/* ========================================= */}
            {/* MOBILE MENU */}
            {/* ========================================= */}

            {isOpen && (

                <div className="md:hidden border-t border-gray-200 bg-white">

                    <div className="px-4 py-5 space-y-3">

                        {/* User Info */}

                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">

                            <div className="
                w-11 h-11 rounded-full
                bg-indigo-100 text-indigo-600
                flex items-center justify-center
                font-semibold
              ">

                                {user?.name?.[0]?.toUpperCase()}

                            </div>

                            <div>

                                <p className="font-medium text-gray-800">
                                    {user?.name}
                                </p>

                                <p className="text-sm text-gray-400">
                                    {user?.email}
                                </p>

                            </div>

                        </div>

                        {/* Links */}

                        <NavLink
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100"
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/applications"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100"
                        >
                            Applications
                        </NavLink>

                        {/* Add Button */}

                        <button
                            onClick={() => {
                                onAddClick();
                                setIsOpen(false);
                            }}
                            className="
                w-full mt-2
                bg-indigo-600 hover:bg-indigo-700
                text-white py-3 rounded-xl
                font-medium transition
              "
                        >

                            Add Application

                        </button>

                        {/* Logout */}

                        <button
                            onClick={handleLogout}
                            className="
                w-full flex items-center justify-center gap-2
                mt-2 border border-red-100
                text-red-600 py-3 rounded-xl
                hover:bg-red-50 transition
              "
                        >

                            <FiLogOut />

                            Logout

                        </button>

                    </div>

                </div>

            )}

        </nav>

    );

};

export default Navbar;