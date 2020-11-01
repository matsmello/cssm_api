const argon2 = require('argon2');
const { password } = require('../config/config');

module.exports = (sequelize, DataType) => {

  const Sharing = sequelize.define('sharings', {
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
    preset: {
      type: DataType.JSON,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    destination: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }    
  });    
  return Sharing;
};