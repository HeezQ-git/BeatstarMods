const users = require('../../../models/users');
const workshopSongs = require('../../../models/workshopSongs');
// const fs = require('fs');
const { getError } = require('../../../utils/getError');

const uploadSong = async (req, res) => {
    let result = {
        success: false,
        errorInfo: '',
    };

    try {
        const { image, imageName, title, difficulty, artists, bpm, duration, genre, description } = req.body;

        const user = await users.findOne({ username: req.user.user.username });

        if (user) {
            const songId = '';

            const newSong = {
                authorId: user._id.toString(),
                songId,
                image,
                imageName,
                title,
                difficulty,
                artists,
                bpm,
                duration,
                genre,
                description,
            };
    
            const song = await workshopSongs.create(newSong);

            if (song) {
                result.success = true;
                result.songId = song._id.toString();
            } else {
                result = {
                    ...result,
                    ...getError('song', 'SONG_NOT_CREATED'),
                };
            }
        } else {
            result.errorInfo = getError('user', 'USER_NOT_EXIST');
        }

    } catch (err) {
        result.errorInfo = getError('other', 'UNEXPECTED');
        result.error = err;
        console.log(err);
    }
    
    return res.status(result.errorInfo?.msg ? 550 : 200).json(result);
};

module.exports = {
    uploadSong,
};
