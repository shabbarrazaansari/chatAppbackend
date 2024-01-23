const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth');
const controller = require('../controller/message')
const jwt = require('jsonwebtoken')

router.post('/message',authentication.authentication,controller.message);
router.get('/message',authentication.authentication,controller.getMessage);

module.exports = router;