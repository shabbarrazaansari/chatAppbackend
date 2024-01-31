const express = require('express');
const jwt = require('jsonwebtoken')

const Group = require('../models/group');
const UserGroup = require('../models/usergroup');
const Sequelize = require('sequelize');
const { message } = require('./message');
const User = require('../models/signup');
const groupWithName = require('../models/nameandgroup');
// const t = await Sequelize.transaction();



const createGroup = async (req,res)=> {
    const name = req.body.name;
    const userid = req.user.id;
    

    try {
        
    const groupResponse = await Group.create({name:name});
    const username = await User.findOne({where:{id:userid}});
    // console.log('finding username',username);
    const groupandname = await groupWithName.create({name:username.name,groupId:groupResponse.id});
    // console.log('group name>>>>',groupandname);

    const userGroupCreationResult = await UserGroup.create({userId:userid,groupId:groupResponse.id,isAdmin:true})
    res.status(201).json({data:groupResponse,message:'group created'})
    // await t.commit();
        
    } catch (error) {
        // await t.rollback();

        console.log("error in crreating group",error)
        // console.log(error);
    }

    


}

const allGroup = async(req,res)=> {

    try {
        const userid = req.user.id;
        const details = await UserGroup.findAll({
             where: { userId: userid },
            attributes:["groupId"]
        });
        if (!details) {
            return res.status(200).json({ message: 'not joined in any group' });
        }
        let arrayGroup =[];
        for ( let i =0;i<details.length;i++){
            const groupData = await Group.findOne({
                where:{id:details[i].groupId},
                attributes:["id","name"]
            })
            arrayGroup.push(groupData);

        }
        
        // console.log("group details", arrayGroup);
        const clearGroups = arrayGroup.map(ele=>{
            return {id:ele.id,name:ele.name};
        })
        // console.log("hello original group",clearGroups)
        res.status(200).json(clearGroups);

       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
        
        // // const 
        // const admin = details.isAdmin;
        // // console.log(adm)

        // const groups = await Group.findByPk(details.groupId);
        // if(!admin){
        //     console.log(groups)
        //     return res.status(200).json(groups);
        // }
        // if(groups && admin){
        //     return res.status(200).json(groups,{message:'groups finded'},{admin:true})
        // }
        // else{
        //     return res.status(400).json({message:"something wrong"})
        // }

        
    
}

module.exports = {
    createGroup,
    allGroup
}