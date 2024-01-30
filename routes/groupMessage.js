const express = require('express');
const router = express.Router();
const controller = require('../controller/groupMessage');
const authentication = require('../middleware/auth')

router.post('/groupmsg',authentication.authentication,controller.postGroupMsg);
router.get('/groupmsg/:id',authentication.authentication,controller.getGroupMsg);
router.get('/groupmember/:id',authentication.authentication,controller.joinedUsers);

module.exports = router;