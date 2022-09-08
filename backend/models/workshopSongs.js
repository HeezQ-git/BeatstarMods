const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workshopSongsSchema = new Schema({
    authorId: String,
    songId: String,
    image: String,
    imageName: String,
    title: String,
    difficulty: String,
    artists: [String],
    bpm: Number,
    duration: {
        minutes: Number,
        seconds: Number,
    },
    genre: [String],
    description: String,
    created: {
        type: Date,
        default: Date.now,
    },
    updated: Date,
});

const workshopSongs = mongoose.model('workshopSongs', workshopSongsSchema);
module.exports = workshopSongs;
