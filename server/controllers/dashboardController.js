import asyncHandler from "../middleware/async.js"
import Application from "../models/Application.js";

export const getDashboardData = asyncHandler(
    async (req, res) => {

        const stats = await Application.aggregate([
            {
                $match: {
                    user: req.user._id,
                },
            },
            {
                $group: {
                    _id: null,

                    total: {
                        $sum: 1,
                    },

                    offers: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: [
                                        "$status",
                                        "Offer",
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },

                    interviews: {
                        $sum: {
                            $cond: [
                                {
                                    $in: [
                                        "$status",
                                        [
                                            "Interview Scheduled",
                                            "Interviewed",
                                        ],
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },

                    highPriority: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: [
                                        "$priority",
                                        "High",
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                    followUps: {
                        $sum: {
                            $cond: [
                                {
                                    $gte: [
                                        "$followUpDate",
                                        new Date(),
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
        ]);

        console.log(stats);

        const dashboardStats = stats[0] || {
            total: 0,
            offers: 0,
            interviews: 0,
            highPriority: 0,
            followUps: 0,
        };

        const total =
            dashboardStats.total;

        const offers =
            dashboardStats.offers;

        const interviews =
            dashboardStats.interviews;

        const highPriority =
            dashboardStats.highPriority;

        const offerRate =
            total > 0
                ? ((offers / total) * 100).toFixed(1)
                : 0;

        const followUps =
            dashboardStats.followUps;

        const [recentApplications,
            upcomingFollowUps] = await Promise.all([
                Application.find({
                    user: req.user._id,
                })
                    .sort({ createdAt: -1 })
                    .limit(5),
                Application.find({
                    user: req.user._id,
                    followUpDate: {
                        $gte: new Date(),
                    },
                })
                    .sort({ followUpDate: 1 })
                    .limit(3),
            ]);

        res.status(200).json({
            success: true,

            stats: {
                total,
                interviews,
                offers,
                highPriority,
                offerRate,
                followUps
            },

            recentApplications,

            upcomingFollowUps
        });

    }
);