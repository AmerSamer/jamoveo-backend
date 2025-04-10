const asyncHandler = require('express-async-handler');
const { findSongs, findSong, createSong } = require('../services/songService')
const fs = require("fs");
const path = require("path");

const getSongs = asyncHandler(async (req, res) => {
    try {
        const songs = await findSongs();
        if (songs) {
            return res.status(200).json({ message: "User retrieved successfully", data: songs });
        } else {
            throw new Error("Invalid Song Data");
        }
    } catch (error) {
        throw new Error(error);
    }
})
const getSong = asyncHandler(async (req, res) => {
    // const filename = req.params.filename;
    const { file } = req.params;
    const filePath = path.join(__dirname, "../utilities", file);
 
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.status(404).json({ error: "Song not found" });

        try {
            const json = JSON.parse(data);
            res.json(json);
        } catch (err) {
            res.status(500).json({ error: "Invalid JSON format" });
        }
    });

    //////////////
    // try {
    //     const { name } = req.params;
    //     const filePath = path.join(__dirname, "../songs", name);
    //     if (!name) {
    //         throw new Error("file is required");
    //     }

    //     const song = await findSong(name);
    //     if (song) {
    //         return res.status(200).json({ message: "Song retrieved successfully", data: song });
    //     } else {
    //         throw new Error("Invalid Song Data");
    //     }
    // } catch (error) {
    //     throw new Error(error.message);
    // }
})
const addSong = asyncHandler(async (req, res) => {
    const { name, file, artist, img } = req.body
    try {
        const query = {
            name,
            file,
            artist,
            img
        }
        const song = await createSong(query);
        if (song) {
            res.status(201).json({
                Message: "added song successfully",
                data: song
            })
        } else {
            res.status(400)
            throw new Error("Invalid Song Data")
        }
    } catch (error) {
        res.status(401);
        throw new Error(error.message);
    }
})

module.exports = {
    getSongs,
    getSong,
    addSong
}