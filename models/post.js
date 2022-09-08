const {
    DataTypes
} = require("sequelize");
const db = require("../db");

const Post = db.define('post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false
    },
    topic: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    readtime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    thumbnailpath: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
    }
});

module.exports = Post;