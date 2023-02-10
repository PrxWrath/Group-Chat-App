const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Group = sequelize.define('groups', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    groupImg:Sequelize.STRING,
    createdBy:{
        type:Sequelize.STRING,
        allowNull:false
    }
})  

module.exports = Group;