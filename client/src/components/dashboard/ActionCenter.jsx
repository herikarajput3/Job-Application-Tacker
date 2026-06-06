import {
    FaFire,
    FaClock,
    FaUserTie,
    FaExclamationTriangle,
} from "react-icons/fa";

const ActionCenter = ({
    highPriority,
    followUps,
    overdueFollowUps,
    interviews,
}) => {

    const actions = [
        {
            title: "High Priority",
            description: "Applications needing extra attention",
            value: highPriority,
            icon: <FaFire />,
            bg: "bg-red-50",
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
        },
        {
            title: "Upcoming Follow-Ups",
            description: "Scheduled follow-up tasks",
            value: followUps,
            icon: <FaClock />,
            bg: "bg-purple-50",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
        },
        {
            title: "Overdue Follow-Ups",
            description: "Tasks requiring immediate action",
            value: overdueFollowUps,
            icon: <FaExclamationTriangle />,
            bg: "bg-amber-50",
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
        },
        {
            title: "Interviews In Progress",
            description: "Applications currently in interview stages",
            value: interviews,
            icon: <FaUserTie />,
            bg: "bg-blue-50",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
    ];

    return (
        <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

            {/* Header */}

            <div className="mb-6">

                <h2 className="text-xl font-semibold text-gray-900">
                    Action Center
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Focus on what needs attention right now.
                </p>

            </div>

            {/* Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                {actions.map((action) => (

                    <div
                        key={action.title}
                        className={`
                            ${action.bg}
                            rounded-2xl
                            border border-gray-100
                            p-5
                            transition-all
                            duration-300
                            hover:shadow-md
                        `}
                    >

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm font-medium text-gray-600">
                                    {action.title}
                                </p>

                                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                    {action.value}
                                </h3>

                                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                    {action.description}
                                </p>

                            </div>

                            <div
                                className={`
                                    w-12 h-12
                                    rounded-xl
                                    flex items-center justify-center
                                    text-lg
                                    ${action.iconBg}
                                    ${action.iconColor}
                                `}
                            >
                                {action.icon}
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default ActionCenter;