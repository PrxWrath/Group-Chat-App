const GroupUsers = require('../models/GroupUsers');
const logger = require('../services/logger');
const {Op} = require('sequelize');

exports.postMakeAdmin = async(req,res,next) => {
    try{
        const user = await GroupUsers.findOne({where:{
            [Op.and]:[
                {userId: req.body.userId},
                {groupId: req.body.group}
            ]
        }}) 
        user.isAdmin = true;
        await user.save()
        res.status(201).json({msg:'Made admin'});
    }catch(err){
        logger.write(err.stack)
    }
}

exports.postRemoveMember = async(req,res,next) => {
    try{
        const user = await GroupUsers.findOne({where:{
            [Op.and]:[
                {userId: req.body.userId},
                {groupId: req.body.group}
            ]
        }})
        await user.destroy(); //remove exisiting group user

        res.status(200).json({msg:'Removed User'});
    }catch(err){
        logger.write(err.stack)
    }
}

