import React from 'react'
import StatCard from '../../components/StatCard';
import { FaAward, FaBriefcase, FaUserTie } from 'react-icons/fa';

const Dashboard = () => {
  const applications = [
    { id: 1, role: "Frontend Developer", company: "Google", status: "Applied" },
    { id: 2, role: "Backend Developer", company: "Amazon", status: "Interview" },
  ];

  const total = applications.length;
  const interviews = applications.filter(a => a.status === "Interview").length;
  const offers = applications.filter(a => a.status === "Offer").length;

  const statusStyle = {
    Applied: "bg-blue-100 text-blue-600",
    Interview: "bg-yellow-100 text-yellow-700",
    Offer: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-600",
  };

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
            color={statusStyle.Applied}
          />
          <StatCard
            title="Interviews"
            value={interviews}
            icon={<FaUserTie />}
            color={statusStyle.Interview}
          />
          <StatCard
            title="Offers"
            value={offers}
            icon={<FaAward />}
            color={statusStyle.Offer}
          />
        </div>
        {/* Recent Applications */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>

            <button className='text-sm text-indigo-600 hover:underline'>
              View All
            </button>
          </div>

          <div className='space-y-3'>
            {applications.map((app) => (
              <div
                key={app.id}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <div>
                  <p className='font-medium text-gray-800'>{app.role}</p>
                  <p className='text-sm text-gray-500'>{app.company}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[app.status]}`}>
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