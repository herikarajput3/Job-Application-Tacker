import React from 'react'
import { FaAward, FaBriefcase, FaUserTimes } from 'react-icons/fa'
import { FaUserTie } from 'react-icons/fa6'

const Dashboard = () => {
  return (
    <div className='max-w-6xl mx-auto px-6 py-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <p className='text-gray-500 mt-2'>Track and manage your job applications</p>
      </div>

      {/* Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition'>

          <div className='flex items-center gap-3 mb-4'>

            <p className='text-gray-500 text-sm font-medium'>Total Applications</p>
            <div className='bg-blue-50 text-blue-600 text-sm p-2 rounded-lg'>
              <FaBriefcase />
            </div>
          </div>
          <h2 className='text-4xl font-bold mt-4'>25</h2>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition'>

          <div className='flex items-center gap-3 mb-4'>
            <p className='text-gray-500 text-sm font-medium'>
              Interviews
            </p>

            <div className='bg-purple-50 text-purple-600 text-sm p-2 rounded-lg'>
              <FaUserTie />
            </div>
          </div>

          <h2 className='text-4xl font-bold mt-4'>
            5
          </h2>

        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition'>

          <div className='flex items-center gap-3 mb-4'>
            <p className='text-gray-500 text-sm font-medium'>
              Offers
            </p>

            <div className='bg-green-50 text-green-600 text-sm p-2 rounded-lg'>
              <FaAward />
            </div>
          </div>

          <h2 className='text-4xl font-bold mt-4'>
            2
          </h2>

        </div>
      </div>

      {/* Recent Activities */}
      <div className='mt-10'>
        <h2 className='text-2xl font-bold mb-4'>
          Recent Applications
        </h2>

        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300'>

          <div className='flex justify-between items-center py-3 border-b border-gray-200'>

            <div >
              <p className='font-medium'>Frontend Developer</p>
              <p className='text-sm text-gray-500'>Google</p>
            </div>

            <span className='bg-blue-100 px-3 py-1 rounded-full text-sm font-medium text-blue-700'>
              Applied
            </span>
          </div>

          <div className='flex justify-between items-center py-3 border-b border-gray-200'>

            <div>
              <p className='font-medium'>React Developer</p>
              <p className='text-sm text-gray-500'>Amazon</p>
            </div>

            <span className='bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium text-yellow-700'>
              Interview
            </span>

          </div>


          <div className='flex justify-between items-center py-3'>
            <div>
              <p className='font-medium'>Software Engineer</p>
              <p className='text-sm text-gray-500'>Meta</p>
            </div>

            <span className='bg-green-100 px-3 py-1 rounded-full text-sm font-medium text-green-700'>
              Offer
            </span>
          </div>

          <div className='pt-3 mt-3 border-t border-gray-200'>
            <button className='text-blue-600 text-sm font-medium cursor-pointer hover:text-blue-700 transition'>
              View All Applications →
            </button>
          </div>

        </div>
      </div>

    </div>

  )
}

export default Dashboard