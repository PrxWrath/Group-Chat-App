const User = require('../models/user');
const Invites = require('../models/invites');
const Group = require('../models/Group');
const logger = require('../services/logger');
const {Op} = require('sequelize');

exports.sendInvite = async(req,res,next) => {
    try{
        //find a user with any of the matching details
     const invited = await User.findOne({where: {
        [Op.or]:[
            {name:req.body.to},
            {phone:req.body.to},
            {email:req.body.to}
        ]
     }});

     if(!invited){
        //user name invalid
        res.json({err:'User not found'}).status(404);
     }else{
        const invitedFor = await Group.findByPk(req.body.for.id);
        const user = req.user;
        
        //create a new invite entry for a specific group and user
        await user.createInvite({
            to: invited.name,
            forgroup: invitedFor.name,
            groupId: invitedFor.id,
            from: user.name
        })
        
        res.status(201).json({msg:'Sent invite'});
     }
     
    }catch(err){
        logger.write(err.stack)
    }
}

exports.getInvites = async(req,res,next) => {
    try{
        const invites = await Invites.findAll({where:{
            to:req.user.name
        }});
      
        if(invites){
            res.status(200).json(invites);
        }else{
            res.status(200).json({msg:"No invites!"});
        }
    }catch(err){
        logger.write(err.stack)
    }
}

exports.acceptInvite = async(req,res,next) => {
    try{
        //add user to the invited group
        const addToGroup = await Group.findByPk(req.body.group);
        await addToGroup.addUser(req.user);
        
        //remove invite entry
        const invite = await Invites.findByPk(req.body.invite);
        await invite.destroy();
        res.status(200).json({msg:'Accepted Invite'});
    }catch(err){
        logger.write(err.stack)
    }
}

exports.rejectInvite = async(req,res,next) => {
    try{
        //remove invite entry
        const invite = await Invites.findByPk(req.body.invite);
        await invite.destroy();
        res.status(200).json({msg:'Rejected Invite'});
    }catch(err){
        logger.write(err.stack)
    }
}