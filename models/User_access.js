const argon2 = require('argon2');
const { password } = require('../config/config');

module.exports = (sequelize, DataType) => {

  const User_access = sequelize.define('user_accesses', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataType.INTEGER,
      allowNull: false
    },
    url: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }    
  });  
  return User_access;
};