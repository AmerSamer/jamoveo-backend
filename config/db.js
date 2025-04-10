/**
 * db.js
 *
 * Connects the Express server to MongoDB using Mongoose.
 * - Uses MONGO_URL from environment variables
 * - Logs connection status
 * - Exits the process on failure
 */

const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MonogoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}
module.exports = connectDB