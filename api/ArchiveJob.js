const cron = require('cron');
const logger = require('./services/logger');
const Chats = require('./models/Chat');
const Archive = require('./models/Archive');
const {Op} = require('sequelize');

const job = new cron.CronJob('0 0 * * *', async function(){
    try{    
        const oldChats = await Chats.findAll();
        const chatsToArchive = oldChats.map(chat=>{
            return {message: chat.message, from:chat.from, fileUrl: chat.fileUrl, userId: chat.userId, groupId: chat.groupId}
        })

        await Archive.bulkCreate(chatsToArchive);
        await Chats.destroy({where:{}});
    }catch(err){
        logger.write(err.stack)
    }
})
job.start();