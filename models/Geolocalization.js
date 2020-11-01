const argon2 = require('argon2');
const { password } = require('../config/config');

module.exports = (sequelize, DataType) => {

  const Geolocalization = sequelize.define('geolocalizations', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user  : {
      type: DataType.INTEGER,
      allowNull: false
    },
    lat : {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    long  : {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }    
  });    
  return Geolocalization;
};