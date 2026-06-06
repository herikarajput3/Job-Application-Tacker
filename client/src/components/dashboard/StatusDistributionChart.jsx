import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = [
    "#6366f1",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#6b7280",
    "#ec4899",
];

const StatusDistributionChart = ({ data }) => {

    return (

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

            <div className="mb-6">

                <h2 className="text-xl font-semibold text-gray-900">
                    Status Distribution
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Breakdown of applications by status
                </p>

            </div>

            <div className="h-80">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="status"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >

                            {data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                        index %
                                        COLORS.length
                                        ]
                                    }
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default StatusDistributionChart;