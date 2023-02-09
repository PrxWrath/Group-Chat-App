const logger = require('../services/logger');
const Group = require('../models/Group');
const { Op } = require('sequelize');


exports.postAddChat = async (req,res,next) => {
    try{
        const user = req.user;
        await user.createChat({
            message: req.body.msg,
            groupId: req.body.group,
            from: `${user.email} ${user.name}`
        })
        res.status(201).json({msg:'Created new message entry!'})
    }catch(err){
        logger.write(err.stack)
    }
}

exports.getChats = async(req,res,next) => {
    try{
        let msgId = req.body.lastMsgId;
        let grpId = req.body.group;
        
        //fetch new chats
        const group = await Group.findByPk(grpId)
        let chats = await group.getChats({where: {
            id: {
                [Op.gt]: +msgId
            }
        }})
        if(chats){
            res.status(200).json(chats);
        }else{
            res.status(200).json({msg:'No new chats found'});
        }

    }catch(err){
        logger.write(err.stack);
    }
}

exports.postCreateGroup = async(req,res,next) => {
    try{
        const user = req.user;

        //create new group entry and add the first user
        const group = await Group.create({
            name:req.body.name,
            groupImg: req.body.img? req.body.img: null,
            admin: `${user.email} ${user.name}`
        })

        await group.addUser(user);

        res.status(201).json({msg:'Group created'});
    }catch(err){
        logger.write(err.stack)
    }
}

exports.getUserGroups = async(req,res,next) => {
    try{
        const groups = await req.user.getGroups();
        
        res.status(200).json(groups);
    }catch(err){
        logger.write(err.stack)
    }
}

