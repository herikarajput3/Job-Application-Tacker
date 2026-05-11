import React from 'react'
import StatCard from '../../components/StatCard';
import { FaAward, FaBriefcase, FaUserTie } from 'react-icons/fa';
import { Link, useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const { applications } = useOutletContext();

  const total = applications.length;
  const interviews = applications.filter(a => a.status === "Interview").length;
  const offers = applications.filter(a => a.status === "Offer").length;

  const statColors = {
    Applied: {
      bg: "bg-blue-100",
      icon: "text-blue-600",
      glow: "bg-blue-400",
      ring: "ring-1 ring-blue-200"
    },
    Interview: {
      bg: "bg-yellow-100",
      icon: "text-yellow-700",
      glow: "bg-yellow-400",
      ring: "ring-1 ring-yellow-200"
    },
    Offer: {
      bg: "bg-green-100",
      icon: "text-green-600",
      glow: "bg-green-400",
      ring: "ring-1 ring-green-200"
    },
  }
  const recentApplications = applications.slice(0, 5);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className='text-2xl md:text-3xl font-semibold text-gray-900'>Welcome back 👋</h1>
          <p className='text-gray-500 mt-1 text-sm'>Here’s a quick overview of your job search</p>
        </div>
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatCard
            title="Total Applications"
            value={total}
            icon={<FaBriefcase />}
            color={statColors.Applied}
          />
          <StatCard
            title="Interviews"
            value={interviews}
            icon={<FaUserTie />}
            color={statColors.Interview}
          />
          <StatCard
            title="Offers"
            value={offers}
            icon={<FaAward />}
            color={statColors.Offer}
          />
        </div>
        {/* Recent Applications */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>

            <Link to="/applications" className='text-sm text-indigo-600 hover:underline'>
              View All
            </Link>
          </div>

          <div className='space-y-3'>
            {recentApplications.map((app) => (
              <div
                key={app._id}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <div>
                  <p className='font-medium text-gray-800'>{app.role}</p>
                  <p className='text-sm text-gray-500'>{app.company}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium 
${statColors[app.status]?.bg} 
${statColors[app.status]?.icon}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard