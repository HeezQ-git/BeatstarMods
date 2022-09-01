const express = require('express');
const router = express.Router();
const loginService = require('./service/login');

router.post('/api/login', loginService.loginUser);
router.post('/api/signup', loginService.registerUser);
router.post('/api/check-username', loginService.checkUsername);
router.post('/api/check-email', loginService.checkEmail);

module.exports = router;
