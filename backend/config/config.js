const mongoose = require('mongoose');

mongoose.set('autoIndex', true);

require('dotenv').config();

const hostDB = `mongodb+srv://HeezQ:${process.env.DATABASE_PASSWORD}@cluster0.arnucus.mongodb.net/?retryWrites=true&w=majority`;

module.exports = {
    hostDB,
};
