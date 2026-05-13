const errorMiddleware = (err, req, res, next) => {

    let error = err;

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

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Server Error",
    });

};

export default errorMiddleware;