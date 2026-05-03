import { useState } from 'react'
import ApplicationForm from '../../components/ApplicationForm';
import ApplicationTable from '../../components/ApplicationTable';
import Modal from '../../components/Modal';

const Applications = () => {

    const [applications, setApplications] = useState([])

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [editingApp, setEditingApp] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
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

    const handleAdd = (newApp) => {
        setApplications(prev => [...prev, newApp]);
        toast.success("Application added!");
    };

    const handleUpdate = (updatedApp) => {
        setApplications(prev =>
            prev.map(app =>
                app.id === updatedApp.id ? updatedApp : app
            )
        );
        toast.success("Application updated!");
    };

    const handleDelete = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = () => {
        setApplications(prev =>
            prev.filter(app => app.id !== deleteId)
        );
        setDeleteId(null);
        toast.success("Application deleted!");
    };

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
                        onClick={() => {
                            setEditingApp(null);
                            setIsModalOpen(true);
                        }}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
                        + Add
                    </button>
                </div>
            </div>

            {/* 🔹 Table */}
            <ApplicationTable
                data={filteredApplications}
                statusStyle={statusStyle}
                onEdit={(app) => {
                    setEditingApp(app);
                    setIsModalOpen(true);
                }}
                onDelete={handleDelete}
            />

            {/*FORM Modal */}

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingApp(null);
                }}
            >
                <ApplicationForm
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    editingApp={editingApp}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingApp(null);
                    }}
                />
            </Modal>

            {/* DELETE Modal */}

            {deleteId && (
                <Modal isOpen={true} onClose={() => setDeleteId(null)}>
                    <div className="p-6 text-center">
                        <p className="mb-4">Are you sure you want to delete this application?</p>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >Yes</button>
                            <button
                                onClick={() => setDeleteId(null)}
                                className="bg-gray-200 px-4 py-2 rounded"
                            >Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}

        </div >
    )
}

export default Applications