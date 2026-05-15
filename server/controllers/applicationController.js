import asyncHandler from "../middleware/async.js";
import Application from "../models/Application.js"
import ErrorResponse from "../utils/errorResponse.js";

export const createApplication = asyncHandler(async (req, res) => {
  const application = await Application.create(req.body);
  res.status(201).json({
    success: true,
    message: "Application created successfully",
    data: application
  });
});

// Get all applications
export const getApplications = asyncHandler(async (req, res) => {

  const { status, search } = req.query;

  let query = {};

  // Status filter
  if (status && status !== "All") {
    query.status = status;
  }

  // Search filter
  if (search) {
    query.$or = [
      {
        company: {
          $regex: search,
          $options: "i",
        },
      },
      {
        role: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const applications = await Application.find().sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    message: "Applications fetched successfully",
    count: applications.length,
    data: applications,
  });

});

// Get single application
export const getApplicationById = asyncHandler(async (req, res) => {

  const application = await Application.findById(req.params.id);

  if (!application) {
    throw new ErrorResponse("Application not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Application fetched successfully",
    data: application,
  });

});
// Update application
export const updateApplication = asyncHandler(async (req, res) => {

  const updatedApplication = await Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedApplication) {
    throw new ErrorResponse("Application not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Application updated successfully",
    data: updatedApplication,
  });

});

// Delete application
export const deleteApplication = asyncHandler(async (req, res) => {

  const deletedApplication = await Application.findByIdAndDelete(
    req.params.id
  );

  if (!deletedApplication) {
    throw new ErrorResponse("Application not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Application deleted successfully",
  });

});