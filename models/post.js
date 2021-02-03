module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
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
        }
    });
    return Post;
}