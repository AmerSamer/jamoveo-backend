const Song = require('../models/songModel')

const findSongs = () => {
    return Song.find({});
}
const findSong = (name) => {
    return Song.findOne({ name });
}
const createSong = (query) => {
    return Song.create(query);
}

module.exports = {
    findSongs,
    findSong,
    createSong
}