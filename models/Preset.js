const argon2 = require('argon2');
const { password } = require('../config/config');

module.exports = (sequelize, DataType) => {

  const Preset = sequelize.define('presets', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataType.INTEGER,
      allowNull: false
    },
    preset: {
      type: DataType.JSON,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });   
  return Preset;
};