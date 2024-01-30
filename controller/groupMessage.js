const  express = require('express')
const jwt = require('jsonwebtoken');

const Message = require('../models/message');
const nameWithGroup = require('../models/nameandgroup');
const User = require('../models/signup');

const postGroupMsg = async (req,res)=>{
   const message = req.body.message;
   const groupId = req.body.id;
   const userid = req.user.id;

   try {

   const msg = await Message.create({message:message,userId:userid,groupId:groupId});
   res.status(200).json(msg);

    
   } catch (error) {
    console.log(error);
   }
   
}

const getGroupMsg = async (req,res)=>{
    try {
        // console.log(params)
        const id = req.params.id;

       const arraymsg =  await Message.findAll({where:{groupId:id},attributes:['message']});
       console.log('all grp msg',arraymsg)
       res.status(200).json(arraymsg);

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    postGroupMsg,
    getGroupMsg
}