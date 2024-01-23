const User = require('../models/signup');
const jwt = require('jsonwebtoken');

exports .authentication = async (req,res,next)=>{
    const token = req.header('Authorization');
    
    try {
        const user = jwt.verify(token,process.env.TOKEN_SECRET);
        const fetchUser = await User.findByPk(user.userId);
        if(!fetchUser){
            throw new Error('user not found');

        }
        req.user = fetchUser;
        next();


    } catch (error) {
        console.error('Middleware error:', error);
        res.status(401).json({ error: 'Authentication failed' });
    }
}