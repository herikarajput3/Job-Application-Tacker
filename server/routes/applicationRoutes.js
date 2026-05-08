import express from "express";
import { createApplication, getApplications } from "../controllers/applicationController.js";

const router = express.Router();

// Create application
router.post("/", createApplication);

// Get all applications
router.get("/", getApplications);

// Get single application
router.get("/:id", (req, res) => {
    res.send("Get single application");
})

// Update application
router.put("/:id", (req, res) => {
    res.send("Update application");
})

// Delete application
router.delete("/:id", (req, res) => {
    res.send("Delete application");
})

export default router;