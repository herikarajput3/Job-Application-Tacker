import asyncHandler from "../middleware/async.js";
import Application from "../models/Application.js"
import ErrorResponse from "../utils/errorResponse.js";
import { performance } from "perf_hooks";

export const createApplication = asyncHandler(async (req, res) => {
  const application = await Application.create({
    ...req.body,
    user: req.user.id,
  });
  res.status(201).json({
    success: true,
    message: "Application created successfully",
    data: application
  });
});

// Get all applications
export const getApplications = asyncHandler(async (req, res) => {

  const { status, search } = req.query;

  const page = parseInt(req.query.page) || 1;
  const limit =
    Math.min(
      parseInt(req.query.limit) || 5,
      50
    );
  if (
    isNaN(page) ||
    isNaN(limit) ||
    page < 1 ||
    limit < 1
  ) {

    throw new ErrorResponse(
      "Invalid pagination values",
      400
    );

  }

  const skip = (page - 1) * limit; // for page 2 it becomes 5 which means skip first 5 records

  let query = {
    user: req.user.id,
  };

  // Status filter

  const allowedStatuses = [
    "Saved",
    "Applied",
    "Assessment",
    "Interview Scheduled",
    "Interviewed",
    "Offer",
    "Rejected",
    "Ghosted",
  ];

  if (
    status &&
    status !== "All" &&
    !allowedStatuses.includes(status)
  ) {

    throw new ErrorResponse(
      "Invalid status filter",
      400
    );

  }

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
  const totalApplications = await Application.countDocuments(query);

  // const applications = await Application.find(query)
  //   .sort({
  //     createdAt: -1,
  //   })
  //   .skip(skip)
  //   .limit(limit);

  // it is used to explain the performance of the query
  const explainResult = await Application.find(query)
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit)
    .explain("executionStats");

  console.log(
    JSON.stringify(explainResult, null, 2)
  );

  const start = performance.now();
  console.log(start, "start");

  const applications = await Application.find(query)
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const end = performance.now();
  console.log(end, "end");

  console.log(
    `Query Execution Time: ${end - start} ms`
  );

  res.status(200).json({
    success: true,
    message: "Applications fetched successfully",
    pagination: {
      total: totalApplications,
      page,
      limit,
      pages: Math.ceil(totalApplications / limit),
    },
    count: applications.length,
    data: applications,
  });

});

// Get single application
export const getApplicationById = asyncHandler(async (req, res) => {

  const application = await Application.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

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

  const updatedApplication = await Application.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user.id,
    },
    req.body,
    {
      returnDocument: "after",
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

  const deletedApplication = await Application.findOneAndDelete(
    {
      _id: req.params.id,
      user: req.user.id,
    }
  );

  if (!deletedApplication) {
    throw new ErrorResponse("Application not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Application deleted successfully",
  });

});