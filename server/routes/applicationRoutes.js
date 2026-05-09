import express from "express";
import { createApplication, deleteApplication, getApplicationById, getApplications, updateApplication } from "../controllers/applicationController.js";

const router = express.Router();

// Create application
router.post("/", createApplication);

// Get all applications
router.get("/", getApplications);

// Get single application
router.get("/:id", getApplicationById);

// Update application
router.put("/:id", updateApplication);

// Delete application
router.delete("/:id", deleteApplication);

export default router;