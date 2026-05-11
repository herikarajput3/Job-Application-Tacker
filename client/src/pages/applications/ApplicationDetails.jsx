import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../service/api";

const ApplicationDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);

    const statusStyle = {
        Applied: "bg-blue-100 text-blue-700",
        Interview: "bg-yellow-100 text-yellow-700",
        Offer: "bg-green-100 text-green-700",
        Rejected: "bg-red-100 text-red-700",
    };

    const fetchApplication = async () => {
        try {

            const response = await API.get(
                `/applications/${id}`
            );

            setApplication(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApplication();
    }, []);

    if (!application) {
        return (
            <div className="p-10 text-center">
                Loading...
            </div>
        );
    }
    return (
        <div className="max-w-6xl mx-auto px-6 py-8">

            {/* 🔹 Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-gray-500 hover:text-indigo-600 transition mb-6"
            >
                ← Back
            </button>

            {/* 🔹 Header */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                        <p className="text-sm text-gray-500 mb-2">
                            {application.company}
                        </p>

                        <h1 className="text-3xl font-bold text-gray-900">
                            {application.role}
                        </h1>
                    </div>

                    <span
                        className={`inline-flex px-4 py-2 rounded-full text-sm font-medium w-fit ${statusStyle[application.status]}`}
                    >
                        {application.status}
                    </span>

                </div>

            </div>

            {/* 🔹 Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Notes */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

                        <h2 className="text-lg font-semibold mb-4">
                            Notes
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            {application.notes}
                        </p>

                    </div>

                    {/* Timeline */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

                        <h2 className="text-lg font-semibold mb-4">
                            Application Timeline
                        </h2>

                        <div className="space-y-4">

                            <div className="flex gap-3">
                                <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1.5"></div>

                                <div>
                                    <p className="font-medium text-gray-800">
                                        Applied
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {new Date(application.dateApplied).toDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1.5"></div>

                                <div>
                                    <p className="font-medium text-gray-800">
                                        Interview Scheduled
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Awaiting technical round
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">

                    {/* Info Card */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

                        <h2 className="text-lg font-semibold mb-5">
                            Application Info
                        </h2>

                        <div className="space-y-4">

                            <div>
                                <p className="text-sm text-gray-400">
                                    Company
                                </p>

                                <p className="font-medium text-gray-800">
                                    {application.company}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">
                                    Role
                                </p>

                                <p className="font-medium text-gray-800">
                                    {application.role}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">
                                    Location
                                </p>

                                <p className="font-medium text-gray-800">
                                    {application.location}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">
                                    Salary
                                </p>

                                <p className="font-medium text-gray-800">
                                    {application.salary}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Actions */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

                        <h2 className="text-lg font-semibold mb-5">
                            Actions
                        </h2>

                        <div className="flex flex-col gap-3">

                            <button
                                onClick={() => navigate("/applications")}
                                className="w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition"
                            >
                                Edit Application
                            </button>

                            <button
                                onClick={() => navigate("/applications")}
                                className="w-full border border-red-200 text-red-600 py-2.5 rounded-xl hover:bg-red-50 transition">
                                Delete Application
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ApplicationDetails;