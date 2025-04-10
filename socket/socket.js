let currentSong = null;

module.exports = (io) => {
    io.on("connection", (socket) => {
        // console.log("🔌 Client connected:", socket.id);

        socket.on("join-room", () => {
            socket.join("rehearsal");
            if (currentSong) {
                socket.emit("load-song", currentSong);
            }
        });

        socket.on("select-song", (songData) => {
            currentSong = songData;
            io.to("rehearsal").emit("load-song", currentSong);
        });

        socket.on("quit-session", () => {
            currentSong = null;
            io.to("rehearsal").emit("session-ended");
        });

        socket.on("disconnect", () => {
            //   console.log("❌ Client disconnected:", socket.id);
        });
    });
};
