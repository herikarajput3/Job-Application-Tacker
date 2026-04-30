import React from 'react'

const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className='bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-1'>
            <div>
                <p className='text-sm text-gray-500'>{title}</p>
                <h2 className='text-3xl font-semibold mt-1 text-gray-900'>{value}</h2>
            </div>

            <div
                className={` relative p-3 rounded-xl 
            ${color.bg}
            ${color.ring}
            `}
            >
                {/* Glow Layer */}

                <div
                    className={`absolute inset-0 rounded-xl blur-md opacity-40 ${color.glow}`}
                ></div>

                {/* Icon */}
                <div className='relative'>
                    {React.cloneElement(icon, {
                        className: `text-lg ${color.icon}`
                    })}
                </div>
            </div>
        </div>

    )
}

export default StatCard