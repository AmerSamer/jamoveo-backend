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

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

connectDB();
connectFirebaseAdmin();
socket(io);

// Socket.IO setup for real-time communication
// io.on('connection', (socket) => {
//     console.log('A user connected');
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/song', require('./routes/songRoutes'));

// Global Error Middleware
app.use(errorHandler);

// Start server
server.listen(port, () => {
    console.log(`Server running at port ${port}/`);
});
