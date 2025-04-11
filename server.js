/**
 * JaMoveo Backend Server
 *
 * - Node.js with Express
 * - Firebase Admin SDK for token verification
 * - MongoDB via Mongoose
 * - Socket.IO for real-time communication
 * - CORS support and custom error handling
 */

require('dotenv').config();
const port = process.env.PORT || 8082
const express = require("express");
const app = express();
const { errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors');
const connectDB = require('./config/db');
const connectFirebaseAdmin = require('./config/firebaseAdmin');
const colors = require('colors');
const socket = require('./socket/socket');
const socketIo = require('socket.io');
const http = require('http');

// 🔌 Create HTTP server (needed for Socket.IO to work with Express)
const server = http.createServer(app);

// 🎤 Initialize Socket.IO on top of HTTP server
const io = socketIo(server, { cors: { origin: "*" } });

// 🌐 Global Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

// 🔗 Connect MongoDB
connectDB();

// 🔐 Initialize Firebase Admin SDK
connectFirebaseAdmin();

// 🔌 Setup Socket.IO listeners
socket(io);

// 📦 API Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/song', require('./routes/songRoutes'));
// Test
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from JaMoveo! 4" });
});
// Global Error Middleware
app.use(errorHandler);

// Start server
server.listen(port, () => {
    console.log(`Server running at port ${port}/`);
});
