import React from 'react';
import StatCard from '../../components/StatCard';

import {
  FaAward,
  FaBriefcase,
  FaUserTie,
  FaFire,
  FaClock,
} from 'react-icons/fa';

import {
  Link,
  useNavigate,
  useOutletContext
} from 'react-router-dom';

const Dashboard = () => {

  const { applications } = useOutletContext();
  const navigate = useNavigate();

  // ===============================
  // Dashboard Metrics
  // ===============================

  const total = applications.length;

  const interviews = applications.filter(
    (a) =>
      a.status === "Interview Scheduled" ||
      a.status === "Interviewed"
  ).length;

  const offers = applications.filter(
    (a) => a.status === "Offer"
  ).length;

  const highPriority = applications.filter(
    (a) => a.priority === "High"
  ).length;

  const followUps = applications.filter(
    (a) => a.followUpDate
  ).length;

  const offerRate =
    total > 0
      ? ((offers / total) * 100).toFixed(1)
      : 0;

  // ===============================
  // Status UI Colors
  // ===============================

  const statusStyle = {

    Saved: {
      bg: "bg-gray-100",
      text: "text-gray-600",
    },

    Applied: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },

    Assessment: {
      bg: "bg-purple-100",
      text: "text-purple-700",
    },

    "Interview Scheduled": {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
    },

    Interviewed: {
      bg: "bg-orange-100",
      text: "text-orange-700",
    },

    Offer: {
      bg: "bg-green-100",
      text: "text-green-600",
    },

    Rejected: {
      bg: "bg-red-100",
      text: "text-red-600",
    },

    Ghosted: {
      bg: "bg-neutral-200",
      text: "text-neutral-700",
    },
  };

  // ===============================
  // Recent Applications
  // ===============================

  const recentApplications = applications.slice(0, 5);

  const upcomingFollowUps = applications
    .filter((app) => {

      if (!app.followUpDate) return false;

      const today = new Date();
      const followUp = new Date(app.followUpDate);

      return followUp >= today;

    })
    .slice(0, 3);

  return (

    <div className="min-h-screen bg-[#f8fafc]">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ========================================= */}
        {/* HERO SECTION */}
        {/* ========================================= */}

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 mb-8">

          {/* LEFT HERO */}

          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">

            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10">

              <p className="text-indigo-100 text-sm font-medium tracking-wide">
                JOB SEARCH DASHBOARD
              </p>

              <h1 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
                Welcome back 👋
              </h1>

              <p className="mt-4 text-indigo-100 max-w-lg leading-relaxed">
                Track applications, manage interviews,
                and stay organized throughout your job search journey.
              </p>

              {/* Quick Metrics */}

              <div className="flex flex-wrap gap-10 mt-10">

                <div>
                  <p className="text-indigo-200 text-sm">
                    Applications
                  </p>

                  <h2 className="text-3xl font-bold mt-1">
                    {total}
                  </h2>
                </div>

                <div>
                  <p className="text-indigo-200 text-sm">
                    Interviews
                  </p>

                  <h2 className="text-3xl font-bold mt-1">
                    {interviews}
                  </h2>
                </div>

                <div>
                  <p className="text-indigo-200 text-sm">
                    Offer Rate
                  </p>

                  <h2 className="text-3xl font-bold mt-1">
                    {offerRate}%
                  </h2>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE CARD */}

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Upcoming Follow-Ups
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {followUps}
                </h2>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl shadow-sm">
                <FaClock />
              </div>

            </div>

            <div className="mt-8 space-y-4">

              {upcomingFollowUps.length === 0 ? (

                <div className="border border-dashed border-gray-200 rounded-2xl p-6 text-center">

                  <p className="text-sm text-gray-400">
                    No upcoming follow-ups
                  </p>

                </div>

              ) : (

                upcomingFollowUps.map((app) => (

                  <div
                    key={app._id}
                    className="flex justify-between items-center"
                  >

                    <div>

                      <p className="font-medium text-gray-800">
                        {app.company}
                      </p>

                      <p className="text-sm text-gray-500">
                        {app.role}
                      </p>

                    </div>

                    <p className="text-xs text-gray-400">
                      {new Date(app.followUpDate).toLocaleDateString()}
                    </p>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* STATS */}
        {/* ========================================= */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <StatCard
            title="Applications"
            value={total}
            icon={<FaBriefcase />}
            color={{
              bg: "bg-blue-100",
              icon: "text-blue-600",
              ring: "ring-1 ring-blue-200"
            }}
          />

          <StatCard
            title="Interviews"
            value={interviews}
            icon={<FaUserTie />}
            color={{
              bg: "bg-yellow-100",
              icon: "text-yellow-700",
              ring: "ring-1 ring-yellow-200"
            }}
          />

          <StatCard
            title="Offers"
            value={offers}
            icon={<FaAward />}
            color={{
              bg: "bg-green-100",
              icon: "text-green-600",
              ring: "ring-1 ring-green-200"
            }}
          />

          <StatCard
            title="High Priority"
            value={highPriority}
            icon={<FaFire />}
            color={{
              bg: "bg-red-100",
              icon: "text-red-600",
              ring: "ring-1 ring-red-200"
            }}
          />

        </div>

        {/* ========================================= */}
        {/* RECENT APPLICATIONS */}
        {/* ========================================= */}

        <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

          <div className="flex justify-between items-center mb-5">

            <div>

              <h2 className="text-xl font-semibold text-gray-900">
                Recent Applications
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest activity from your applications
              </p>

            </div>

            <Link
              to="/applications"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
            >
              View All
            </Link>

          </div>

          <div className="space-y-3">

            {recentApplications.length === 0 ? (

              <div className="border border-dashed border-gray-200 rounded-2xl p-10 text-center">

                <p className="text-gray-400">
                  No applications added yet
                </p>

              </div>

            ) : (

              recentApplications.map((app) => (

                <div
                  key={app._id}
                  onClick={() => navigate(`/applications/${app._id}`)}
                  className="flex justify-between items-center p-4 rounded-2xl border border-transparent hover:border-gray-200 hover:bg-gray-50 cursor-pointer transition-all duration-200"
                >

                  <div>

                    <p className="font-semibold text-gray-900">
                      {app.role}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {app.company}
                    </p>

                  </div>

                  <span
                    className={`
                      inline-flex px-3 py-1 rounded-full text-xs font-medium
                      ${statusStyle[app.status]?.bg}
                      ${statusStyle[app.status]?.text}
                    `}
                  >
                    {app.status}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>

  );
};

export default Dashboard;