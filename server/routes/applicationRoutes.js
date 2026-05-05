import express from "express";

const router = express.Router();

// Create application
router.post("/", (req, res) => {
    res.send("Create application");
})

// Get all applications
router.get("/", (req, res) => {
    res.send("Get all applications");
})

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