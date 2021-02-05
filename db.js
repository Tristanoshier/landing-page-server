const Sequelize = require('sequelize');

// db connection and authentication
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log('database is connected'))
    .catch((err => console.log(err)));

// model imports
Admin = sequelize.import('./models/admin');
Post = sequelize.import('./models/post');
Project = sequelize.import('./models/project');

// db table associations 
Admin.hasMany(Post);
Post.belongsTo(Admin);

Admin.hasMany(Project);
Project.belongsTo(Admin);


module.exports = sequelize;

