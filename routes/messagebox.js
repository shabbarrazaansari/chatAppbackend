const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth');
const controller = require('../controller/message')
const jwt = require('jsonwebtoken')
const path = require('path')
// multer 
const multer = require('multer');
const storage = multer.memoryStorage(); // Use memory storage instead of saving to disk
// const upload = multer({ storage: storage });
// used to save in local storage
// var storage = multer.diskStorage({
//     destination: function(req,res,cb) {
//         cb(null,"./public/myupload");
//     },
//     filename :function (req,file,cb) {
//         const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })
const upload = multer({ storage: storage })

router.post('/message',authentication.authentication,controller.message);
router.get('/message',authentication.authentication,controller.getMessage);
router.post('/upload',upload.single('avatar'),controller.multimedia);

module.exports = router;