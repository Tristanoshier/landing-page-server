const {
    DataTypes
} = require("sequelize");
const db = require("../db");

const Admin = db.define('admin', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
});

module.exports = Admin;