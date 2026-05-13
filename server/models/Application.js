import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },

    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
      maxlength: [100, "Role cannot exceed 100 characters"],
    },

    status: {
      type: String,
      enum: {
        values: [
          "Saved",
          "Applied",
          "Assessment",
          "Interview Scheduled",
          "Interviewed",
          "Offer",
          "Rejected",
          "Ghosted",
        ],
        message: "Invalid application status",
      },
      default: "Applied",
    },

    dateApplied: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },

    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },

    salaryRange: {
      type: String,
      trim: true,
    },

    jobType: {
      type: String,
      enum: {
        values: [
          "Full-time",
          "Internship",
          "Contract",
          "Freelance",
        ],
        message: "Invalid job type",
      },
    },

    source: {
      type: String,
      enum: {
        values: [
          "LinkedIn",
          "Referral",
          "Company Website",
          "Indeed",
          "Other",
        ],
        message: "Invalid application source",
      },
    },

    applicationLink: {
      type: String,
      trim: true,
    },

    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    priority: {
      type: String,
      enum: {
        values: ["Low", "Medium", "High"],
        message: "Invalid priority level",
      },
      default: "Medium",
    },

    followUpDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;