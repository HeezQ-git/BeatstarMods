const mongoose = require('mongoose');
const { ACCOUNT_TYPE } = require('../config/variables');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    accountType: {
        type: String,
        default: 'classic',
        enum: [...Object.values(ACCOUNT_TYPE)],
    },
    userType: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    username: String,
    email: String,
    password: String,
    registerDate: {
        type: Date,
        default: Date.now,
    },
    discord: {
        avatar: String,
        banner: String,
        discriminator: String,
        id: String,
    },
    files: {
        config: [
            {
                file: String,
                name: String,
                created: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
});

const users = mongoose.model('users', usersSchema);
module.exports = users;
