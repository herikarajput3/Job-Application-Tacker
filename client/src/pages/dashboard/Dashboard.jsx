import React, { useEffect, useState } from 'react';
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
} from 'react-router-dom';
import API from '../../service/api';
import { useAuth } from '../../context/AuthContext';
import MonthlyTrendChart from '../../components/dashboard/MonthlyTrendChart';
import StatusDistributionChart from '../../components/dashboard/StatusDistributionChart';
import ActionCenter from '../../components/dashboard/ActionCenter';
import DashboardSkeleton from '../../components/dashboard/DashboardSkeleton';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [upcomingFollowUps, setUpcomingFollowUps] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Dashboard Metrics

  const total = stats?.total || 0;

  const interviews = stats?.interviews || 0;

  const offers = stats?.offers || 0;

  const highPriority = stats?.highPriority || 0;

  const followUps = stats?.followUps || 0;

  const overdueFollowUps = stats?.overdueFollowUps || 0;

  const offerRate = stats?.offerRate || 0;

  // Status UI Colors

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

  // Fetch Applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await API.get("/dashboard");

      setStats(response.data.stats);

      setRecentApplications(
        response.data.recentApplications
      );

      setUpcomingFollowUps(
        response.data.upcomingFollowUps
      );

      setStatusDistribution(
        response.data.statusDistribution
      );

      setMonthlyTrend(
        response.data.monthlyTrend
      );

    } catch (error) {

      console.error("Error fetching applications", error);
      setError(
        "Unable to load dashboard data."
      );

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  const isEmptyDashboard = total === 0;

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-12 text-center">

            <div className="text-5xl mb-4">
              ⚠️
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Unable to Load Dashboard
            </h2>

            <p className="text-gray-500 mt-3">
              Something went wrong while loading
              your dashboard data.
            </p>

            <button
              onClick={fetchDashboardData}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Try Again
            </button>

          </div>

        </div>

      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }
  return (

    <div className="min-h-screen bg-[#f8fafc]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {isEmptyDashboard ? (

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">

            <div className="max-w-md mx-auto">

              <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-100 flex items-center justify-center text-3xl mb-6">
                💼
              </div>

              <h2 className="text-3xl font-bold text-gray-900">
                Welcome to JobTracker
              </h2>

              <p className="mt-4 text-gray-500 leading-relaxed">
                Start tracking your applications, interviews,
                offers and follow-ups to gain valuable insights
                into your job search journey.
              </p>

              <Link
                to="/applications"
                className="inline-flex mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
              >
                Add First Application
              </Link>

            </div>

          </div>

        ) : (
          <>
            {/* HERO SECTION */}

            <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 mb-8">

              {/* LEFT HERO */}

              <div className="relative overflow-hidden bg-linear-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">

                {/* Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                <div className="relative z-10">

                  <p className="text-indigo-100 text-sm font-medium tracking-wide">
                    JOB SEARCH DASHBOARD
                  </p>

                  <h1 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
                    Welcome back, {user.name} 👋
                  </h1>

                  <p className="mt-4 text-indigo-100 max-w-lg leading-relaxed">
                    Track applications, manage interviews,
                    and stay organized throughout your job search journey.
                  </p>

                  {/* Quick Metrics */}

                  <div className="grid grid-cols-3 gap-6 mt-10">

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
                        className="flex flex-col
sm:flex-row
gap-3"
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
            {/* ANALYTICS SECTION */}
            {/* ========================================= */}

            <div className="grid lg:grid-cols-2 gap-6 mt-8">

              <StatusDistributionChart
                data={statusDistribution}
              />

              <MonthlyTrendChart
                data={monthlyTrend}
              />

            </div>

            {/* ACTION CENTER */}

            <ActionCenter
              highPriority={highPriority}
              followUps={followUps}
              overdueFollowUps={overdueFollowUps}
              interviews={interviews}
            />

            {/* RECENT APPLICATIONS */}

            <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

              <div className="flex flex-col
  sm:flex-row
  sm:items-center
  justify-between
  gap-3 mb-5">

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
                      className="
flex flex-col
sm:flex-row
sm:items-center
justify-between
gap-3
p-4
rounded-2xl
border border-transparent
hover:border-gray-200
hover:bg-gray-50
cursor-pointer
transition-all duration-200
"
                    >

                      <div className='min-w-0'>

                        <p className="font-semibold text-gray-900">
                          {app.role}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {app.company}
                        </p>

                      </div>

                      <span
                        className={`
        inline-flex
        self-start
        sm:self-auto
        px-3 py-1
        rounded-full
        text-xs
        font-medium
        whitespace-nowrap
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
          </>
        )}

      </div>

    </div >
  );
};

export default Dashboard;