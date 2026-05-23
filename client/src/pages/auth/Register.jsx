import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineUser } from 'react-icons/hi';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import API from '../../service/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            await register(formData);

            toast.success(
                "Account created successfully"
            );

            navigate("/");
        } catch (error) {
            console.error(
                "Error while registering",
                error.response?.data || error
            );
            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    const inputStyle = `
    w-full bg-gray-50 border border-gray-200
    rounded-2xl px-12 py-3.5
    text-gray-800 placeholder:text-gray-400
    focus:outline-none focus:ring-4
    focus:ring-indigo-100
    focus:border-indigo-500
    transition-all duration-200
  `;

    return (

        <div className='min-h-screen bg-white'>
            <div className='grid lg:grid-cols-2 min-h-screen'>
                {/*  Left Side*/}
                <div className='hidden lg:flex relative overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-700 p-14 text-white flex-col justify-between'>
                    {/* Glow effect */}
                    <div className='absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl' />
                    <div className='absolute bottom-0 left-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl' />
                    {/* Logo */}
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold tracking-tight">
                            JobTracker
                        </h1>
                    </div>
                    {/* Main Content */}
                    <div className="relative z-10 max-w-lg">

                        <p className="text-indigo-200 text-sm font-medium tracking-[0.2em] uppercase">
                            Career Management Platform
                        </p>

                        <h2 className="text-5xl font-bold leading-tight mt-6">
                            Organize your job search like a professional.
                        </h2>

                        <p className="text-indigo-100 mt-6 text-lg leading-relaxed">
                            Track applications, manage interviews,
                            schedule follow-ups, and stay focused
                            throughout your entire hiring journey.
                        </p>

                        {/* Features */}
                        <div className='mt-10 space-y-5'>
                            <div className='flex items-center gap-4'>
                                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    ✨
                                </div>

                                <p className="text-indigo-100">
                                    Smart application tracking
                                </p>

                            </div>
                            <div className="flex items-center gap-4">

                                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    📅
                                </div>

                                <p className="text-indigo-100">
                                    Follow-up reminders & timelines
                                </p>
                            </div>

                            <div className="flex items-center gap-4">

                                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    📊
                                </div>

                                <p className="text-indigo-100">
                                    Visual dashboard insights
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* footer */}
                    <div className="relative z-10 text-sm text-indigo-200">
                        Built for modern job seekers.
                    </div>

                </div>
                {/* Right side */}
                <div className="flex items-center justify-center px-6 py-10">

                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="lg:hidden mb-10">

                            <h1 className="text-3xl font-bold text-gray-900">
                                JobTracker
                            </h1>
                        </div>
                        {/* Heading */}
                        <div>
                            <p className="text-sm font-medium text-indigo-600">
                                CREATE ACCOUNT
                            </p>

                            <h2 className="text-4xl font-bold text-gray-900 mt-3">
                                Get Started
                            </h2>

                            <p className="text-gray-500 mt-3 leading-relaxed">
                                Create your account and start managing
                                your job applications efficiently.
                            </p>
                        </div>
                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className='mt-10 space-y-5'
                        >
                            {/* Name */}
                            <div className='relative'>
                                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Full Name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={inputStyle}
                                />
                            </div>
                            {/* Email */}
                            <div className="relative">

                                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                                <input
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputStyle}
                                />
                            </div>
                            {/* Password */}
                            <div className="relative">

                                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    placeholder='Password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={inputStyle}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                >
                                    {showPassword
                                        ? <FiEyeOff size={20} />
                                        : <FiEye size={20} />
                                    }
                                </button>
                            </div>
                            {/* submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3.5 rounded-2xl font-medium transition-all duration-200
                                    ${isSubmitting
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        :
                                        "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
                                    }
                                    `}
                            >
                                {isSubmitting
                                    ? "Creating Account..."
                                    : "Create Account"
                                }
                            </button>
                        </form>
                        {/* Login Link */}
                        <p className="text-sm text-gray-500 mt-8 text-center">
                            Already have an account?

                            <Link
                                to="/login"
                                className="text-indigo-600 font-medium ml-1 hover:text-indigo-700"
                            >
                                Sign in
                            </Link>

                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register     