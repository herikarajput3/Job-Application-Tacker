import { useState } from 'react'
import ApplicationForm from '../../components/ApplicationForm';
import Modal from '../../components/Modal';

const Applications = () => {

    const [applications, setApplications] = useState([])

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [editingApp, setEditingApp] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const statusStyle = {
        Applied: "bg-blue-100 text-blue-600",
        Interview: "bg-yellow-100 text-yellow-700",
        Offer: "bg-green-100 text-green-600",
        Rejected: "bg-red-100 text-red-600"
    }

    const filteredApplications = applications.filter((app) => {
        const matchesSearch =
            app.company.toLowerCase().includes(searchTerm.toLowerCase()) || app.role.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "All" || app.status === statusFilter;

        return matchesSearch && matchesStatus;
    })

    const handleUpdate = (updateApp) => {
        setApplications(prev =>
            prev.map(app =>
                app.id === updateApp.id ? updateApp : app
            )
        )
    }


    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* 🔹 Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Applications</h1>
                <p className="mt-1 text-gray-500 text-sm">Track and manage your job applications</p>
            </div>

            {/* 🔹 Top Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                {/* Search */}
                <div className='relative w-full md:w-1/3'>
                    <input
                        type="text"
                        placeholder="Search company or role..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={searchTerm} // connect input
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className='absolute left-3 top-2 text-gray-400 text-sm'>🔍</span>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-3">

                    {/* Filter */}
                    <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All</option>
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>

                    {/* Add Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
                        + Add
                    </button>
                </div>
            </div>

            {/* Modal */}

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingApp(null);
                }}
            >
                <ApplicationForm
                    onAdd={(newApp) => {
                        setApplications(prev => [...prev, newApp]);
                        setIsModalOpen(false); // close after adding
                    }}
                    onUpdate={handleUpdate}
                    editingApp={editingApp}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingApp(null);
                    }}
                />
            </Modal>

            {/* 🔹 Table */}
            <div className="bg-white rounded-2xl shadow-sm p-2">

                {/* Table Header */}
                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] px-4 py-3 text-xs text-gray-400 uppercase tracking-wide">
                    <span>Company</span>
                    <span>Role</span>
                    <span>Status</span>
                    <span>Date</span>
                    <span className="text-right">Actions</span>
                </div>

                {/* Table Body */}
                <div className="space-y-2">
                    {filteredApplications.map((app) => (
                        <div
                            key={app.id}
                            className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center px-4 py-3 rounded-xl 
                     hover:bg-gray-50 transition"
                        >
                            <span className="font-medium text-gray-800">{app.company}</span>
                            <span className="text-gray-600">{app.role}</span>

                            <span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[app.status]}`}>
                                    {app.status}
                                </span>
                            </span>

                            <span className="text-sm text-gray-500">{app.appliedDate}</span>

                            {/* Actions */}
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setEditingApp(app);
                                        setIsModalOpen(true);
                                    }}
                                    className="px-2 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 transi">
                                    Edit
                                </button>
                                <button

                                    className="px-2 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition">
                                    Delete
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Applications