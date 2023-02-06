const logger = require('../services/logger');
const Chat = require('../models/Chat');

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
        const chats = await Chat.findAll();
        if(chats){
            res.status(200).json(chats);
        }

    }catch(err){
        logger.write(err.stack);
    }
}