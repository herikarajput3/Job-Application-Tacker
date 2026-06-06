import {
    FaFire,
    FaClock,
    FaUserTie,
} from "react-icons/fa";

const ActionCenter = ({
    highPriority,
    followUps,
    interviews,
}) => {

    const actions = [
        {
            title: "High Priority Applications",
            value: highPriority,
            icon: <FaFire />,
            color: {
                bg: "bg-red-100",
                text: "text-red-600",
            },
        },
        {
            title: "Upcoming Follow-Ups",
            value: followUps,
            icon: <FaClock />,
            color: {
                bg: "bg-purple-100",
                text: "text-purple-600",
            },
        },
        {
            title: "Interviews In Progress",
            value: interviews,
            icon: <FaUserTie />,
            color: {
                bg: "bg-yellow-100",
                text: "text-yellow-700",
            },
        },
    ];

    return (

        <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

            <div className="mb-6">

                <h2 className="text-xl font-semibold text-gray-900">
                    Action Center
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Focus on the most important tasks in your job search.
                </p>

            </div>

            <div className="grid md:grid-cols-3 gap-5">

                {actions.map((action) => (

                    <div
                        key={action.title}
                        className="rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    {action.title}
                                </p>

                                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                    {action.value}
                                </h3>

                            </div>

                            <div
                                className={`
                                    w-12 h-12 rounded-xl flex items-center justify-center text-lg
                                    ${action.color.bg}
                                    ${action.color.text}
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