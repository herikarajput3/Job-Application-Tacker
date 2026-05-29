import logger from "../utils/logger.js";
const errorMiddleware = (err, req, res, next) => {

    let error = { ...err };
    error.message = err.message;

    // Log full error internally
    logger.error(err.stack);

    // Wrong MongoDB ObjectId
    if (err.name === "CastError") {
        error.message = "Resource not found";
        error.statusCode = 404;
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {

        const message = Object.values(err.errors)
            .map(val => val.message);

        error.message = message;
        error.statusCode = 400;
    }

    // Default status code
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        // production safe message
        message: process.env.NODE_ENV === "production"
            ? statusCode === 500
                ? "Internal Server Error"
                : error.message
            : error.message,
        // Hide stack in production
        stack: process.env.NODE_ENV === "production"
            ? null : error.stack,
    });

};

export default errorMiddleware;