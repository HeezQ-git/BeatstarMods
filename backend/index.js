require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config');
const loginApi = require('./API/login');
const userApi = require('./API/user');
const workshopApi = require('./API/workshop');

const app = express();

app.use(cors());
app.use(express.static('files'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(loginApi);
app.use(userApi);
app.use(workshopApi);

app.listen(8000, () => {
    console.log('Server running successfully on 8000');
});

mongoose.connect(config.hostDB);

mongoose.connection.on('connected', () => {
    console.log('Connected with database');
});
