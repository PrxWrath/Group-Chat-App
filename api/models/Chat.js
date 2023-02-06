const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Chat = sequelize.define('chats', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    message:{
        type: Sequelize.STRING,
        allowNull:false
    },
    from:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Chat;