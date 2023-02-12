const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Archive = sequelize.define('archives', {
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
    },
    fileUrl: Sequelize.STRING,
  
})

module.exports = Archive;