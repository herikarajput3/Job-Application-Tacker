import jwt from "jsonwebtoken";
import asyncHandler from "./async.js";

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

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user
    req.user = await User.findById(decoded.id);

    next();
});