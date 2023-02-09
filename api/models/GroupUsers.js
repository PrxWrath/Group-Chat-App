const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const GroupUser = sequelize.define('groupusers', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
})  

module.exports = GroupUser;