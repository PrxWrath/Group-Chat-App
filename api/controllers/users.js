const User = require('../models/user');
const bcrypt = require('bcrypt');
const logger = require('../services/logger');


exports.postAddUser = async(req,res,next) => {
    try{
        const data = await User.findOne({where: {email:req.body.email}});
        if(data){
            res.json({
                error: 'Account with provided email already exists!'
            })
        }else{
            bcrypt.hash(req.body.password, 10, async(err, hash)=>{
                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hash
                })
                res.status(201).json({msg:'Your account has been created! Login with new account :)'});
            })
        }
        
    }catch(err){
        logger.write(err.stack);
    }
}

