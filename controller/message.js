const express = require('express');
const Message = require('../models/message');
const jwt = require('jsonwebtoken')

const message = async (req,res)=>{

    const text = req.body.message;
    console.log(text);
    const userId = req.user.id;
    try {
         await Message.create({message:text,userId:userId});
         res.status(200).json({success:true,text})
    } catch (error) {
        console.log(error);
    }

}
const getMessage =async (req,res)=> {
    const userId = req.user.id;
   try {
       const user = await Message.findOne({where:{userid:userId}});
       if(!user){
        return res.status(400).json({success:false,message:'false authentication'});
       }
       const messages = await Message.findAll({where:{userId:userId}});
       res.status(200).json({success:true,messages});

   } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:'internel error'})
    
   }
}

module.exports = {
    message,
    getMessage
}