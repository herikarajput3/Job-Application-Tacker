import React, { useState } from 'react'
import { FaAward, FaBriefcase, FaUserTimes } from 'react-icons/fa'
import { FaUserTie } from 'react-icons/fa6'

const Dashboard = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: "Google",
      role: "Frontend Developer",
      status: "Applied",
      appliedDate: "2024-06-01",
      notes: "Referred by friend"
    },
    {
      id: 2,
      company: "Amazon",
      role: "Backend Developer",
      status: "Interview",
      appliedDate: "2024-06-01",
      notes: "Referred by friend"
    }
  ])

  const statusConfig = {
    Applied: {
      label: "Applied",
      className: "bg-blue-100 text-blue-700"
    },
    Interview: {
      label: "Interview",
      className: "bg-yellow-100 text-yellow-700"
    },
    Offer: {
      label: "Offer",
      className: "bg-green-100 text-green-700"
    },
    Rejected: {
      label: "Rejected",
      className: "bg-red-100 text-red-700"
    }
  }

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
          <div className='divide-y divide-gray-200'>
            {applications.map((app) => (
              <div key={app.id} className='flex justify-between items-center py-3'>
                <div>
                  <p className='font-medium'>{app.role}</p>
                  <p className='text-sm text-gray-500'>{app.company}</p>
                </div>

                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[app.status]?.className || "bg-gray-100 text-gray-700"}`}>
                  {statusConfig[app.status]?.label || app.status}
                </span>
              </div>
            ))}
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