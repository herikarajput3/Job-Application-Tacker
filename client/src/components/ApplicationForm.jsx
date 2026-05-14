import React, { useEffect, useState } from "react";
import API from "../service/api";

const ApplicationForm = ({
    onAdd,
    onUpdate,
    editingApp,
    onClose,
}) => {

    const [formData, setFormData] = useState({
        company: "",
        role: "",
        location: "",
        status: "Saved",
        priority: "Medium",
        salaryRange: "",
        jobType: "Full-time",
        source: "LinkedIn",
        applicationLink: "",
        contactEmail: "",
        followUpDate: "",
        dateApplied: "",
        notes: "",
    });

    const [errors, setErrors] = useState({});

    // 🔥 Reusable input style
    const inputStyle = `
    mt-2 w-full px-4 py-3 rounded-xl border border-gray-200
    bg-white text-gray-800 placeholder:text-gray-400
    focus:outline-none focus:ring-4 focus:ring-indigo-100
    focus:border-indigo-500
    transition-all duration-200
  `;

    // 🔥 Prefill form when editing
    useEffect(() => {
        if (editingApp) {
            setFormData(editingApp);
        }
    }, [editingApp]);

    // 🔥 Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // remove error while typing
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // 🔥 Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!formData.company.trim()) {
            newErrors.company = "Company is required";
        }

        if (!formData.role.trim()) {
            newErrors.role = "Role is required";
        }

        if (!formData.dateApplied) {
            newErrors.dateApplied = "Applied date is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {

            // UPDATE
            if (editingApp) {
                const response = await API.put(
                    `/applications/${editingApp._id}`,
                    formData
                );

                onUpdate(response.data.data);
            }

            // ADD
            else {
                const response = await API.post(
                    "/applications",
                    formData
                );

                onAdd(response.data.data);
            }

            // 🔥 Reset form
            setFormData({
                company: "",
                role: "",
                location: "",
                status: "Saved",
                priority: "Medium",
                salaryRange: "",
                jobType: "Full-time",
                source: "LinkedIn",
                applicationLink: "",
                contactEmail: "",
                followUpDate: "",
                dateApplied: "",
                notes: "",
            });

            // 🔥 Close modal
            onClose();

        } catch (error) {
            console.error("Error saving application", error);
        }
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100">

            {/* HEADER */}
            <div className="flex items-start justify-between px-8 py-6 border-b border-gray-100">

                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {editingApp ? "Edit Application" : "Add New Application"}
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Track and manage your job opportunities
                    </p>
                </div>

                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center rounded-full
          hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
                >
                    ✕
                </button>

            </div>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="p-8 space-y-6 max-h-[75vh] overflow-y-auto"
            >

                {/* 🔥 SECTION 1 */}
                <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/40">

                    <div className="mb-5">
                        <h3 className="font-semibold text-gray-900">
                            Basic Information
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Core job details
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        {/* COMPANY */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Company
                            </label>

                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Google, Amazon..."
                                className={`${inputStyle} ${errors.company
                                    ? "border-red-500 focus:ring-red-100"
                                    : ""
                                    }`}
                            />

                            {errors.company && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.company}
                                </p>
                            )}
                        </div>

                        {/* ROLE */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Role
                            </label>

                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="Frontend Developer"
                                className={`${inputStyle} ${errors.role
                                    ? "border-red-500 focus:ring-red-100"
                                    : ""
                                    }`}
                            />

                            {errors.role && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.role}
                                </p>
                            )}
                        </div>

                        {/* LOCATION */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Remote, Melbourne..."
                                className={inputStyle}
                            />
                        </div>

                    </div>
                </div>

                {/* 🔥 SECTION 2 */}
                <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/40">

                    <div className="mb-5">
                        <h3 className="font-semibold text-gray-900">
                            Workflow
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Track application progress
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        {/* STATUS */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={inputStyle}
                            >
                                <option>Saved</option>
                                <option>Applied</option>
                                <option>Assessment</option>
                                <option>Interview Scheduled</option>
                                <option>Interviewed</option>
                                <option>Offer</option>
                                <option>Rejected</option>
                                <option>Ghosted</option>
                            </select>
                        </div>

                        {/* APPLIED DATE */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Applied Date
                            </label>

                            <input
                                type="date"
                                name="dateApplied"
                                value={formData.dateApplied}
                                onChange={handleChange}
                                className={`${inputStyle} ${errors.dateApplied
                                    ? "border-red-500 focus:ring-red-100"
                                    : ""
                                    }`}
                            />

                            {errors.dateApplied && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.dateApplied}
                                </p>
                            )}
                        </div>

                        {/* PRIORITY */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className={inputStyle}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>

                        {/* FOLLOW UP */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Follow-up Date
                            </label>

                            <input
                                type="date"
                                name="followUpDate"
                                value={formData.followUpDate}
                                onChange={handleChange}
                                className={inputStyle}
                            />
                        </div>

                    </div>
                </div>

                {/* 🔥 SECTION 3 */}
                <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/40">

                    <div className="mb-5">
                        <h3 className="font-semibold text-gray-900">
                            Job Details
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Additional role information
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        {/* SALARY */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Salary Range
                            </label>

                            <input
                                type="text"
                                name="salaryRange"
                                value={formData.salaryRange}
                                onChange={handleChange}
                                placeholder="10LPA - 15LPA"
                                className={inputStyle}
                            />
                        </div>

                        {/* JOB TYPE */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Job Type
                            </label>

                            <select
                                name="jobType"
                                value={formData.jobType}
                                onChange={handleChange}
                                className={inputStyle}
                            >
                                <option>Full-time</option>
                                <option>Internship</option>
                                <option>Contract</option>
                                <option>Freelance</option>
                            </select>
                        </div>

                        {/* SOURCE */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Source
                            </label>

                            <select
                                name="source"
                                value={formData.source}
                                onChange={handleChange}
                                className={inputStyle}
                            >
                                <option>LinkedIn</option>
                                <option>Referral</option>
                                <option>Company Website</option>
                                <option>Indeed</option>
                                <option>Other</option>
                            </select>
                        </div>

                        {/* CONTACT EMAIL */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Contact Email
                            </label>

                            <input
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                placeholder="recruiter@company.com"
                                className={inputStyle}
                            />
                        </div>

                    </div>

                    {/* APPLICATION LINK */}
                    <div className="mt-5">
                        <label className="text-sm font-medium text-gray-700">
                            Application Link
                        </label>

                        <input
                            type="text"
                            name="applicationLink"
                            value={formData.applicationLink}
                            onChange={handleChange}
                            placeholder="https://..."
                            className={inputStyle}
                        />
                    </div>

                </div>

                {/* 🔥 SECTION 4 */}
                <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/40">

                    <div className="mb-5">
                        <h3 className="font-semibold text-gray-900">
                            Notes
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Additional context and reminders
                        </p>
                    </div>

                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Interview notes, recruiter response, reminders..."
                        rows="5"
                        className={inputStyle}
                    />

                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-2xl font-medium text-white
          bg-indigo-600 hover:bg-indigo-700
          transition-all duration-200"
                >
                    {editingApp ? "Update Application" : "Add Application"}
                </button>

            </form>
        </div>
    );
};

export default ApplicationForm;