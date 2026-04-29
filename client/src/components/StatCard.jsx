import React from 'react'

const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className='bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition'>
            <div>
                <p className='text-sm text-gray-500'>{title}</p>
                <h2 className='text-3xl font-semibold mt-1'>{value}</h2>
            </div>

            <div className='p-3 rounded-xl bg-gray-100 text-gray-700'>
                {icon}
            </div>
        </div>

    )
}

export default StatCard