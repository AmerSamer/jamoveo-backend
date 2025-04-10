/**
 * socket.js
 *
 * Handles all real-time events for the JaMoveo rehearsal room using Socket.IO.
 * - Players and admins join the same "rehearsal" room.
 * - Admin can broadcast a song to all connected clients.
 * - Admin can end the session for everyone.
 */

let currentSong = null; // Holds the currently active song during a session

module.exports = (io) => {
    io.on("connection", (socket) => {
        /**
        * join-room
        * Called by all clients (players + admin) when entering the app.
        * - Adds the socket to the "rehearsal" room.
        * - If a song is already active, sends it immediately to the new user.
        */
        socket.on("join-room", () => {
            socket.join("rehearsal");
            if (currentSong) {
                socket.emit("load-song", currentSong);
            }
        });

        /**
         * select-song
         * Called by the admin to broadcast a selected song.
         * - Updates the currentSong variable.
         * - Emits `load-song` to all users in the room.
         */
        socket.on("select-song", (songData) => {
            currentSong = songData;
            io.to("rehearsal").emit("load-song", currentSong);
        });
        
        /**
         * quit-session
         * Called by the admin to end the session.
         * - Clears currentSong state.
         * - Emits `session-ended` to all users.
         */
        socket.on("quit-session", () => {
            currentSong = null;
            io.to("rehearsal").emit("session-ended");
        });

        /**
         * disconnect
         * Fires when a client disconnects from the socket.
         */
        socket.on("disconnect", () => {
            console.log("❌ Client disconnected:", socket.id);
        });
    });
};
