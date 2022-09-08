const {
    DataTypes
} = require("sequelize");
const db = require("../db");

const Project = db.define('project', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    languages: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    projecttype: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    about: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    thumbnailpath: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
    }
});

module.exports = Project;