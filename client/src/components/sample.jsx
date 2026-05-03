import { useState } from "react";
import ApplicationForm from "../../components/ApplicationForm";
import ApplicationTable from "../../components/ApplicationTable";
import Modal from "../../components/Modal";

const Applications = () => {

    // 🔹 MAIN DATA (source of truth)
    const [applications, setApplications] = useState([]);

    // 🔹 UI STATES
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [editingApp, setEditingApp] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [deleteId, setDeleteId] = useState(null);
    const [toast, setToast] = useState("");

    // 🔹 STATUS STYLES
    const statusStyle = {
        Applied: "bg-blue-100 text-blue-600",
        Interview: "bg-yellow-100 text-yellow-700",
        Offer: "bg-green-100 text-green-600",
        Rejected: "bg-red-100 text-red-600"
    };

    // 🔹 FILTERED DATA (derived state)
    const filteredApplications = applications.filter((app) => {
        const matchesSearch =
            app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.role.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || app.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // 🔹 ADD
    const handleAdd = (newApp) => {
        setApplications(prev => [...prev, newApp]);
        showToast("Application Added ✅");
    };

    // 🔹 UPDATE
    const handleUpdate = (updatedApp) => {
        setApplications(prev =>
            prev.map(app =>
                app.id === updatedApp.id ? updatedApp : app
            )
        );
        showToast("Application Updated ✏️");
    };

    // 🔹 DELETE (open modal)
    const handleDelete = (id) => {
        setDeleteId(id);
    };

    // 🔹 CONFIRM DELETE
    const confirmDelete = () => {
        setApplications(prev =>
            prev.filter(app => app.id !== deleteId)
        );
        setDeleteId(null);
        showToast("Application Deleted 🗑");
    };

    // 🔹 TOAST
    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(""), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">

            {/* 🔹 Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Applications</h1>
                <p className="text-sm text-gray-500">
                    Track and manage your job applications
                </p>
            </div>

            {/* 🔹 Controls */}
            <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="border px-3 py-2 rounded-lg w-full md:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="flex gap-3">

                    {/* Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border px-3 py-2 rounded-lg"
                    >
                        <option value="All">All</option>
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>

                    {/* Add */}
                    <button
                        onClick={() => {
                            setEditingApp(null);
                            setIsModalOpen(true);
                        }}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
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

            {/* 🔹 FORM MODAL */}
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

            {/* 🔹 DELETE MODAL */}
            {deleteId && (
                <Modal isOpen={true} onClose={() => setDeleteId(null)}>
                    <div className="p-6 text-center">
                        <p className="mb-4">Are you sure you want to delete?</p>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Yes
                            </button>

                            <button
                                onClick={() => setDeleteId(null)}
                                className="bg-gray-200 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* 🔹 TOAST */}
            {toast && (
                <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded">
                    {toast}
                </div>
            )}

        </div>
    );
};

export default Applications;