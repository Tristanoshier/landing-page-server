const { DataTypes } = require("sequelize");
const db = require("../db");

const Images = db.define('image', {
    path: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    alt: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
});

module.exports = Images
