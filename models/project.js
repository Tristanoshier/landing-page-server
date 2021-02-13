module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project', {
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
        }
    });
    return Project;
}