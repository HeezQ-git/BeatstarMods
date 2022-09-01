const express = require('express');
const router = express.Router();
const userService = require('./service/user');
const { checkToken } = require('../middleware/check-token');

router.post('/api/user/save-config', checkToken, userService.saveConfig);
router.get('/api/user/get-config', checkToken, userService.getConfig);
router.get('/api/user/get-configs', checkToken, userService.getConfigs);
router.post('/api/user/delete-config', checkToken, userService.deleteConfig);

module.exports = router;
