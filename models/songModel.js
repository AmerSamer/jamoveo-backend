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
