import React, { useState } from 'react'

const ApplicationForm = ({ onAdd, onUpdate, editingApp, onClose }) => {

    const [company, setCompany] = useState(editingApp?.company || "");
    const [role, setRole] = useState(editingApp?.role || "");
    const [status, setStatus] = useState(editingApp?.status || "Applied");
    const [date, setDate] = useState(editingApp?.appliedDate || "");
    const [notes, setNotes] = useState(editingApp?.notes || "");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newApp = {
            id: editingApp ? editingApp.id : Date.now(),
            company,
            role,
            status,
            appliedDate: date,
            notes
        }

        if (editingApp) {
            onUpdate(newApp); // edit mode
        }
        else {
            onAdd(newApp); // add mode
        }

        setCompany("");
        setRole("");
        setStatus("Applied");
        setDate("");
        setNotes("");
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className='mb-6'>
                    <h2 className='text-lg font-semibold text-gray-900'>
                        {editingApp ? "Edit Application" : "Add New Application"}
                    </h2>
                    <p className='text-sm text-gray-500 mt-1'>Track a new job opportunity</p>
                </div>

                <button
                    type='button'
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"

                >✕</button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
                {/* Row 1 */}
                <div className='grid md:grid-cols-2 gap-4'>

                    {/* company */}
                    <div>
                        <label className='text-sm text-gray-500'>Company</label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Google, Amazon..."
                            className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    {/* Role */}
                    <div>
                        <label className="text-sm text-gray-500">Role</label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Frontend Developer"
                            className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Row 2 */}

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-500">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option>Applied</option>
                            <option>Interview</option>
                            <option>Offer</option>
                            <option>Rejected</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">Applied Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                </div>

                {/* Notes */}
                <div>
                    <label className="text-sm text-gray-500">Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional notes..."
                        rows="3"
                        className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2.5 rounded-lg 
                     hover:bg-indigo-700 transition font-medium"
                >
                    {editingApp ? "Update Application" : "Add Application"}
                </button>

            </form>
        </div>
    )
}

export default ApplicationForm