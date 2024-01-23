const express = require('express');

const bcrypt = require('bcrypt');
const User = require('../models/signup')

const jwt = require('jsonwebtoken')

function ifStringValid(string) {
    if(string == undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
    
}

const signUp = async (req,res)=>{
    
    const {name,email,password,phone} = req.body;

    try {

        if(ifStringValid(name) || ifStringValid(email) || ifStringValid(password) || ifStringValid(phone)){
            return res.status(400).json({message:"bad parameters something went wrong"})
        }
        const existingUser = await User.findOne({
            where: {
              name: name
            }
          });
         if(existingUser !==null && existingUser !==undefined){
            return res.status(200).json({ success:false,message:"user already exists"})

         } 
        const saltrounds = 10;
        bcrypt.hash(password,saltrounds,async(err,hash)=>{
            const data = await User.create({
                name:name,
                email:email,
                password:hash,
                phone:phone
            })
            res.status(201).json(data)
        })


        
    } catch (error) {
        console.log('somethinf went wrong',error);
        res.status(500).json()
        
    }
}

const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        if(ifStringValid(email) || ifStringValid(password)){
            return res.status(400).json({message:'bad parameters'})
        }
        await User.findAll({where:{email:email}})
        .then(user=>{
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(err){
                    throw new Error();
                }
                if(result === true){
                   return res.status(200).json({success:true,message:"login successfully",token:generateWebToken(user[0].id,user[0].name)})
                }
                else{
                    return res.status(400).json({success:false,message:'password is incorrect'})
                }
            })
        })
        
    } catch (error) {
        return res.status(404).json({success:false,message:'user does not exist'})
        
    }
}

function generateWebToken(id,name){
    return jwt.sign({userId:id,name:name},process.env.TOKEN_SECRET)
}

module.exports = {
    signUp,
    login
}


