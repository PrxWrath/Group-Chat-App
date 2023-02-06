const logger = require('../services/logger');

exports.postAddChat = async (req,res,next) => {
    try{
        const user = req.user;
        await user.createChat({
            message: req.body.msg
        })
        res.status(201).json({msg:'Created new message entry!'})
    }catch(err){
        logger.write(err.stack)
    }
}