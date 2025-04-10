/**
 * songControllers.js
 *
 * Handles all server-side logic for song-related routes:
 * - Fetching all songs
 * - Fetching individual song JSON content
 * - Adding new songs to the database
 */

const asyncHandler = require('express-async-handler');
const { findSongs, findSong, createSong } = require('../services/songService')
const fs = require("fs");
const path = require("path");

/**
 * @route   GET /api/song/songs
 * @desc    Fetch all available songs (admin only)
 * @access  Protected
 */
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

/**
 * @route   GET /api/song/song/:file
 * @desc    Loads a specific song's chords and lyrics from file
 * @access  Protected
 */
const getSong = asyncHandler(async (req, res) => {
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
})

/**
 * @route   POST /api/song/song
 * @desc    Add a new song to the database
 * @access  Protected (admin only)
 */
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