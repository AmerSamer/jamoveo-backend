/**
 * errorMiddleware.js
 *
 * Global error-handling middleware for Express apps.
 * - Formats all errors in a consistent JSON structure
 * - Prevents sending stack traces in production for security
 * - Must be the last middleware registered in the app
 */

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = { errorHandler }