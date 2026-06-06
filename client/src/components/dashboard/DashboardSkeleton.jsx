const DashboardSkeleton = () => {

    return (

        <div className="space-y-8 animate-pulse">

            {/* Hero */}

            <div className="h-64 rounded-3xl bg-gray-200" />

            {/* Stats */}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {[...Array(4)].map((_, index) => (

                    <div
                        key={index}
                        className="h-32 rounded-2xl bg-gray-200"
                    />

                ))}

            </div>

            {/* Charts */}

            <div className="grid lg:grid-cols-2 gap-6">

                <div className="h-96 rounded-3xl bg-gray-200" />

                <div className="h-96 rounded-3xl bg-gray-200" />

            </div>

            {/* Action Center */}

            <div className="h-56 rounded-3xl bg-gray-200" />

            {/* Recent Applications */}

            <div className="h-80 rounded-3xl bg-gray-200" />

        </div>

    );

};

export default DashboardSkeleton;