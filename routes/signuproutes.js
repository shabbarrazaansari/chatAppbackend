const express = require("express");
const router = express.Router();
const controller = require('../controller/signup')


router.post('/signup',controller.signUp);

module.exports = router;