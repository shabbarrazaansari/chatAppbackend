const express = require('express');
const jwt = require('jsonwebtoken');
const groupWithName = require('../models/nameandgroup'); 
const Sequelize = require('sequelize')
const User = require('../models/signup');
const UserGroup = require('../models/usergroup');
const userGroup = require('../models/usergroup');

// search someone so it search from those who are sign in applcation
const search = async (req,res)=>{
    const name = req.params.name;
    console.log(name);
    const id = req.params.id;
    try {
        const user = await User.findOne({where:{name:name}});
        console.log('hello my id is>>>>>>>>>',user.id);
        const checkadmin = await UserGroup.findOne({where:{userId:user.id,groupId:id}})

        console.log('check admin?',checkadmin);
        if(checkadmin){
            if(checkadmin.isAdmin===true){
                return res.status(201).json({isAdmin:true,message:'already a admin',data:checkadmin})
            }
            else {
                return res.status(201).json({isAdmin:false,message:'make admin',data:checkadmin})
            }
        }

        const list = await User.findOne({where:{name:name}})
        console.log('helloo i am most search one',list);
        res.status(200).json(list); 
    } catch (error) {
        console.log(error);
    }

}
const add = async (req,res)=>{

    const userid = req.params.nameid;
    const groupid = req.params.groupid
    try {
        // const checkadmin = await userGroup.findOne({where:{userId:userid,groupId:groupid},attributes:['isAdmin']});
        // console.log(checkadmin);

        // if(checkadmin){
        //     return res.status(201).json({message:'already a admin'});

        // }
        const insert = await userGroup.create({userId:userid,groupId:groupid});
        res.status(200).json({insert,message:"added to group"});

    } catch (error) {
        
    }

}

const makeAdmin =async(req,res)=> {
    try {
        const userid = req.params.id;
        console.log(userid);
        const update = await UserGroup.update({isAdmin:true},{where:{userId:userid},});
        console.log('update row',update[0]);
        if(update[0]===0){
            return res.status(501).json({message:'some fault'})
        }
        
        res.status(200).json({message:'he is admin now'});
        
    } catch (error) {
        console.log(error)
        
    }
}
module.exports = {
    search,
    add,
    makeAdmin
}