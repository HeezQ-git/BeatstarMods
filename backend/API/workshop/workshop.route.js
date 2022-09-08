const express = require('express');
const router = express.Router();
const workshopService = require('./service/workshop');
const { checkToken } = require('../middleware/check-token');

router.post('/api/workshop/upload-song', checkToken, workshopService.uploadSong); 

module.exports = router;
