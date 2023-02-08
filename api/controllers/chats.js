const logger = require('../services/logger');
const Chat = require('../models/Chat');
const { Op } = require('sequelize');

exports.postAddChat = async (req,res,next) => {
    try{
        const user = req.user;
        await user.createChat({
            message: req.body.msg,
            from: `${user.email}-${user.name}`
        })
        res.status(201).json({msg:'Created new message entry!'})
    }catch(err){
        logger.write(err.stack)
    }
}

exports.getChats = async(req,res,next) => {
    try{
        let msgId = req.params.lastMsgId;
        
        //fetch new chats
        let chats = await Chat.findAll({where: {
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