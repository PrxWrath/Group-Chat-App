const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Invite = sequelize.define('invites', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    to: {
        type:Sequelize.STRING,
        allowNull: false
    },
    forgroup:{
        type:Sequelize.STRING,
        allowNull: false
    },
    groupId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    from:{
        type:Sequelize.STRING,
        allowNull: false
    }
})  

module.exports = Invite;