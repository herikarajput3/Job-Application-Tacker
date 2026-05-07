import Application from "../models/Application"

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
