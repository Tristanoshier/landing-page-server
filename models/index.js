// model imports
const Admin = require('./admin');
const Post = require('./post');
const Project = require('./project');
const Images = require('./image');

// db table associations 
Admin.hasMany(Post);
Post.belongsTo(Admin);

Admin.hasMany(Project);
Project.belongsTo(Admin);

Project.hasMany(Images);
Images.belongsTo(Project);

module.exports = {
    Images,
    Post,
    Project,
    Admin
};