/**
 * songModel.js
 *
 * Defines the Mongoose schema for storing song metadata.
 * This model supports song selection, search, and file-based lookup for display.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const songSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique : true
    },
    artist: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Song', songSchema);
