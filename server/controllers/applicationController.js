import Application from "../models/Application.js"

export const createApplication = async (req, res) => {
    try {
        const application = await Application.create(req.body);

        res.status(201).json({
            success: true,
            message: "Application created successfully",
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Get all applications
export const getApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};