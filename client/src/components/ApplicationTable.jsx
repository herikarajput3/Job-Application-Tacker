const ApplicationTable = ({ data, onEdit, onDelete, statusStyle }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-2">

            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] px-4 py-3 text-xs text-gray-400 uppercase">
                <span>Company</span>
                <span>Role</span>
                <span>Status</span>
                <span>Date</span>
                <span className="text-right">Actions</span>
            </div>

            <div className="space-y-2">
                {data.map((app) => (
                    <div key={app.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] px-4 py-3">

                        <span>{app.company}</span>
                        <span>{app.role}</span>

                        <span className={`px-2 py-1 text-xs rounded ${statusStyle[app.status]}`}>
                            {app.status}
                        </span>

                        <span>{app.appliedDate}</span>

                        <div className="flex justify-end gap-2">
                            <button onClick={() => onEdit(app)}>Edit</button>
                            <button onClick={() => onDelete(app.id)}>Delete</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplicationTable;