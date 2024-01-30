const express = require("express");
const router = express.Router();
const middleware = require('../middleware/auth');
const control = require('../controller/adminpower');

router.get('/',(req,res)=>{
    res.send('hello ji')
    
})
router.get('/search/:name/:id',middleware.authentication,control.search);
router.post('/add/:nameid/:groupid',control.add);
router.post('/admin/:id',control.makeAdmin);


module.exports = router;