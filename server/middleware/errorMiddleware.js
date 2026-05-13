const errorMiddleware = (err, req, res, next) => {

    let error = err;

    // Wrong MongoDB ObjectId
    if (err.name === "CastError") {
        error.message = "Resource not found";
        error.statusCode = 404;
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Server Error",
    });

};

export default errorMiddleware;