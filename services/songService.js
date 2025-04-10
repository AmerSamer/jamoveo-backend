/**
 * songService.js
 *
 * Service layer for managing songs in the database.
 * - Handles fetching all songs, finding a song by name, and creating new songs.
 * - Keeps controller logic clean and maintainable.
 */

const Song = require('../models/songModel')

/**
 * findSongs
 * Fetches all songs from the database.
 *
 * @returns {Promise<Array>} Array of all song documents
 */
const findSongs = () => {
    return Song.find({});
}

/**
 * findSong
 * Finds a specific song by its name (exact match).
 *
 * @param {string} name - The name of the song
 * @returns {Promise<Object|null>} The song document, or null if not found
 */
const findSong = (name) => {
    return Song.findOne({ name });
}

/**
 * createSong
 * Creates a new song document in the database.
 *
 * @param {Object} query - Song data including name, artist, file, etc.
 * @returns {Promise<Object>} Created song document
 */
const createSong = (query) => {
    return Song.create(query);
}

module.exports = {
    findSongs,
    findSong,
    createSong
}