import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const MonthlyTrendChart = ({ data }) => {

    return (

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

            <div className="mb-6">

                <h2 className="text-xl font-semibold text-gray-900">
                    Monthly Application Trend
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Applications submitted over the last 6 months
                </p>

            </div>

            <div className="h-80">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="month"
                        />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="applications"
                            stroke="#6366f1"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default MonthlyTrendChart;