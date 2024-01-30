const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const nameWithGroup = sequelize.define('groupandname',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name : Sequelize.STRING,

});
module.exports = nameWithGroup;