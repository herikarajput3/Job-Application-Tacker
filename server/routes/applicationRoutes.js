import express from "express";
import { createApplication, deleteApplication, getApplicationById, getApplications, updateApplication } from "../controllers/applicationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Create application
router.post("/", protect, createApplication);

// Get all applications
router.get("/", protect, getApplications);

// Get single application
router.get("/:id", protect, getApplicationById);

// Update application
router.put("/:id", protect, updateApplication);

// Delete application
router.delete("/:id", protect, deleteApplication);

export default router;