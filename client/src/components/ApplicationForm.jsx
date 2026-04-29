import React, { useState } from 'react'

const ApplicationForm = ({ onAdd }) => {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("Applied")
    const [date, setDate] = useState("")
    const [notes, setNotes] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        const newApp = {
            id: Date.now(),
            company,
            role,
            status,
            appliedDate: date,
            notes
        }

        onAdd(newApp);
        setCompany("");
        setRole("");
        setStatus("Applied");
        setDate("");
        setNotes("");
    }

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className='space-y-4'>

                {/* Company */}
                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium'>Company</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        placeholder="Enter company name"
                    />
                </div>
                {/* Role */}
                <div className='flex flex-col gap-1'>
                    <label className="text-sm font-medium">Role</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Enter job role"
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                {/* Status */}
                <div className='flex flex-col gap-1'>
                    <label className="text-sm font-medium">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    >
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>
                </div>
                {/* Date */}
                <div className='flex flex-col gap-1'>
                    <label className="text-sm font-medium">Applied Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                {/* Notes */}
                <div className='flex flex-col gap-1'>
                    <label className="text-sm font-medium">Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional notes..."
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Add Application
                </button>
            </form>
        </div>
    )
}

export default ApplicationForm