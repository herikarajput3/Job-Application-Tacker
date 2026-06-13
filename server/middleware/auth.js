import jwt from "jsonwebtoken";
import asyncHandler from "./async.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
        throw new ErrorResponse("Not authorized to access this route", 401);
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        // find user
        req.user = await User.findById(decoded.id);

        next();
    } catch (error) {
        throw new ErrorResponse("Not authorized to access this route", 401);
    }
    });