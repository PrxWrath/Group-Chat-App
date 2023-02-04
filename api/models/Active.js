const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Active = sequelize.define('activeusers', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});

module.exports = Active;