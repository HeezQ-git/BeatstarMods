require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.static('files'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(songsApi);

// const fileupload = require('express-fileupload');
// app.use(fileupload());
// app.post('/upload', (req, res) => {
//     const newpath = __dirname + '/files/';
//     const file = req.files.file;
//     const filename = file.name;

//     file.mv(`${newpath}${filename}`, (err) => {
//         console.log(err);
//         if (err) {
//             res.status(500).send({ message: 'File upload failed', code: 500 });
//         }
//         res.status(200).send({ message: 'File Uploaded', code: 200 });
//     });
// });

app.listen(8000, () => {
    console.log('Server running successfully on 8000');
});

mongoose.connect(config.hostDB);

mongoose.connection.on('connected', () => {
    console.log('Connected with database');
});
