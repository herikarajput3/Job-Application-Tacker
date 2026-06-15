import express from "express";
import { getMe, login, register, refreshAccessToken } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post(
    "/refresh",
    refreshAccessToken
);
router.get("/me", protect, getMe);

export default router;