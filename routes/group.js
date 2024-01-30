const express = require('express');
const router = express.Router();

const authentication = require('../middleware/auth');
const controller = require('../controller/group')

router.post('/group',authentication.authentication,controller.createGroup);
router.get('/getgroup',authentication.authentication,controller.allGroup);


module.exports = router;