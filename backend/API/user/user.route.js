const express = require('express');
const router = express.Router();
const userService = require('./service/user');
const { checkToken } = require('../middleware/check-token');

router.get('/api/user', checkToken, userService.getUser);
router.post('/api/user/save-config', checkToken, userService.saveConfig);
router.post('/api/user/get-config', checkToken, userService.getConfig);
router.get('/api/user/get-configs', checkToken, userService.getConfigs);
router.post('/api/user/delete-config', checkToken, userService.deleteConfig);
router.post('/api/user/update-config', checkToken, userService.updateConfig);

module.exports = router;
