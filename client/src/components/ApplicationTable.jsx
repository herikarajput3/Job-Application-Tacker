const ApplicationTable = ({ data, onEdit, onDelete, statusStyle }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

            {/* Header */}
            <div className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] px-6 py-3 text-xs text-gray-400 uppercase tracking-wide bg-gray-50">
                <span>Company</span>
                <span>Role</span>
                <span>Status</span>
                <span>Date</span>
                <span className="text-right">Actions</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-100">
                {data.length === 0 && (
                    <p className="text-center py-10 text-gray-400">
                        No applications yet
                    </p>
                )}
                {data.map((app) => (
                    <div
                        key={app.id}
                        className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] items-center px-6 py-4 hover:bg-gray-50 transition"
                    >
                        {/* Company */}
                        <div>
                            <p className="font-medium text-gray-900">{app.company}</p>
                        </div>

                        {/* Role */}
                        <p className="text-gray-600">{app.role}</p>

                        {/* Status */}
                        <div>
                            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${statusStyle[app.status]}`}>
                                {app.status}
                            </span>
                        </div>

                        {/* Date */}
                        <p className="text-sm text-gray-500">{app.appliedDate}</p>

                        {/* Actions */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => onEdit(app)}
                                className="text-sm text-gray-500 hover:text-indigo-600 transition"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => onDelete(app.id)}
                                className="text-sm text-gray-500 hover:text-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default ApplicationTable;