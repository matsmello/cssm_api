const argon2 = require("argon2");
const {password} = require ("../config/config");


module.export = (sequelize, DataType) => {

    const User = sequelize.define('users',{
        id:{
            type: DataType.INTERGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        name: {
            type: DataType.STRING,
            allowNull: false, 
            validate:{
                notEmpty: true
            }
        },
        birthday:{
            type: DataType.DATE,
            allowNull: false
        },
        origin: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        email:{
            type: DataType.STRING,
            allowNull: false
        },
        
    });


};
