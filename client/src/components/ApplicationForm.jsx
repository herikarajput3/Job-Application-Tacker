import React, { useEffect, useState } from 'react'

const ApplicationForm = ({ onAdd, onUpdate, editingApp, onClose }) => {

    const [formData, setFormData] = useState({
        company: "",
        role: "",
        status: "Applied",
        appliedDate: "",
        notes: ""
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!formData.company.trim()) {
            newErrors.company = "Company is required";
        }

        if (!formData.role.trim()) {
            newErrors.role = "Role is required";
        }

        if (!formData.appliedDate) {
            newErrors.appliedDate = "Date is required";
        }

        setErrors(newErrors);

        // ❗ stop if errors exist
        if (Object.keys(newErrors).length > 0) return;

        const newApp = {
            id: editingApp ? editingApp.id : Date.now(),
            ...formData
        };

        if (editingApp) {
            onUpdate(newApp); // edit mode
        }
        else {
            onAdd(newApp); // add mode
            setFormData({
                company: "",
                role: "",
                status: "Applied",
                appliedDate: "",
                notes: ""
            });
        }

        onClose();
    }

    // Prefill form data
    useEffect(() => {
        if (editingApp) {
            setFormData(editingApp);
        }
    }, [editingApp]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // remove error when user starts typing
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className='mb-6'>
                    <h2 className='text-lg font-semibold text-gray-900'>
                        {editingApp ? "Edit Application" : "Add New Application"}
                    </h2>
                    <p className='text-sm text-gray-500 mt-1'>Track a new job opportunity</p>
                </div>

                <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full 
             hover:bg-gray-100 transition"
                >
                    ✕
                </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
                {/* Row 1 */}
                <div className='grid md:grid-cols-2 gap-4'>

                    {/* company */}
                    <div>
                        <label className='text-sm text-gray-500'>Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Google, Amazon..."
                            className={`mt-1 w-full px-3 py-2 rounded-lg border 
    ${errors.company ? "border-red-500" : "border-gray-200"}
    focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        />
                        {errors.company && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.company}
                            </p>
                        )}
                    </div>
                    {/* Role */}
                    <div>
                        <label className="text-sm text-gray-500">Role</label>
                        <input
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={`mt-1 w-full px-3 py-2 rounded-lg border 
    ${errors.role ? "border-red-500" : "border-gray-200"}`}
                        />

                        {errors.role && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.role}
                            </p>
                        )}
                    </div>
                </div>

                {/* Row 2 */}

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-500">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
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
                            name="appliedDate"
                            value={formData.appliedDate}
                            onChange={handleChange}
                            className={`mt-1 w-full px-3 py-2 rounded-lg border 
    ${errors.appliedDate ? "border-red-500" : "border-gray-200"}`}
                        />

                        {errors.appliedDate && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.appliedDate}
                            </p>
                        )}
                    </div>

                </div>

                {/* Notes */}
                <div>
                    <label className="text-sm text-gray-500">Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Optional notes..."
                        rows="3"
                        className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg font-medium text-white
           bg-linear-to-r from-indigo-600 to-purple-600
           hover:opacity-90 transition"
                >
                    {editingApp ? "Update Application" : "Add Application"}
                </button>

            </form>
        </div>
    )
}

export default ApplicationForm