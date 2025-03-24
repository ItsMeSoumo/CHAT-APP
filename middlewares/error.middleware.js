export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; 
    err.message = err.message || "Internal Server Error"; // ✅ Default message

    res.status(statusCode).json({
        success: false,
        errMessage: err.message
    });
};



