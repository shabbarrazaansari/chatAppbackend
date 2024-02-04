const express = require('express');
const Message = require('../models/message');
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk');

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
        return res.status(201).json({success:true,message:'no messages'});
       }
       const messages = await Message.findAll({where:{userId:userId}});
       res.status(200).json({success:true,messages});

   } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:'internel error'})
    
   }
}
const multimedia = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file provided' });
      }
  
      const fileKey = `myupload/${Date.now()}_${req.file.originalname}`;
      
      // Assuming req.file.buffer contains the file data
      const s3Location = await uploadToS3(req.file.buffer, fileKey);
  
      console.log(s3Location);
      res.status(200).json({ message: 'File uploaded to Amazon S3', s3Location });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
module.exports = {
    message,
    getMessage,
    multimedia
}
function uploadToS3(data , fileName){
    const BUCKET_NAME = 'appgroupchat';
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;


    let s3Bucket = new AWS.S3({

       accessKeyId :IAM_USER_KEY,
       secretAccessKey : IAM_USER_SECRET,
      // bucket:BUCKET_NAME
    });


         const params = {
             Bucket : BUCKET_NAME,
             Key:  fileName,
             Body: data,
             ACL : 'public-read'
         }

          return new Promise( (res ,rej ) =>{

            s3Bucket.upload(params,  (err, s3response) =>{
                if(err){

                    console.log("Somthing WentWrong..",err)
                    rej(err);

                }
                else{
                  console.log(s3response.Location);  
                     res(s3response.Location)
                }
          })

          })




};