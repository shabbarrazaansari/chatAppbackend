const express = require('express');
const router = express.Router();
const controller = require('../controller/groupMessage');
const authentication = require('../middleware/auth')
const imagemsg = require('../controller/message');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.post('/groupmsg',authentication.authentication,controller.postGroupMsg);
router.get('/groupmsg/:id',authentication.authentication,controller.getGroupMsg);
router.get('/groupmember/:id',authentication.authentication,controller.joinedUsers);
router.post('/groupupload',upload.single('avatargroup'),imagemsg.multimedia);

module.exports = router;