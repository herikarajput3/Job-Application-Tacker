import asyncHandler from "../middleware/async.js"
import Application from "../models/Application.js";

export const getDashboardData = asyncHandler(
    async (req, res) => {

        const applications =
            await Application.find({
                user: req.user.id,
            });

        const total = applications.length;

        const interviews = applications.filter(
            app =>
                app.status === "Interview Scheduled" ||
                app.status === "Interviewed"
        ).length;

        const offers = applications.filter(
            app => app.status === "Offer"
        ).length;

        const highPriority = applications.filter(
            app => app.priority === "High"
        ).length;

        const offerRate =
            total > 0
                ? ((offers / total) * 100).toFixed(1)
                : 0;

        const today = new Date();

        const followUps = applications.filter(app => {

            if (!app.followUpDate) {
                return false;
            }

            return new Date(app.followUpDate) >= today;

        }).length;

        const recentApplications =
            await Application.find({
                user: req.user.id,
            })
                .sort({ createdAt: -1 })
                .limit(5);

        const upcomingFollowUps = applications
            .filter(app => {

                if (!app.followUpDate) {
                    return false;
                }

                return new Date(app.followUpDate) >= new Date();

            })
            .sort(
                (a, b) =>
                    new Date(a.followUpDate) -
                    new Date(b.followUpDate)
            )
            .slice(0, 3);

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