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

// Get single application
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    // If application not found
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update application
export const updateApplication = async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // If application not found
    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete application
export const deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(
      req.params.id
    );

    // If application not found
    if (!deletedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};