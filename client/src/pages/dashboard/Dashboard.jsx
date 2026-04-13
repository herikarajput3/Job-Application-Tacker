import React from 'react'

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
          <p className='text-gray-500 text-sm font-medium'>Total Applications</p>
          <h2 className='text-3xl font-bold mt-3'>25</h2>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition'>
          <p className='text-gray-500 text-sm font-medium'>Interviews</p>
          <h2 className='text-3xl font-bold mt-3'>5</h2>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition'>
          <p className='text-gray-500 text-sm font-medium'>Offers</p>
          <h2 className='text-3xl font-bold mt-3'>2</h2>
        </div>
      </div>

      {/* Recent Activities */}
      <div className='mt-10'>
        <h2 className='text-2xl font-bold mb-4'>
          Recent Applications
        </h2>

        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <div className='flex justify-between items-center py-3 border-b border-gray-200'>
            <div>
              <p className='font-medium'>Frontend Developer</p>
              <p className='text-sm text-gray-500'>Google</p>
            </div>
            <span className='text-sm font-medium text-blue-600'>
              Applied
            </span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Dashboard