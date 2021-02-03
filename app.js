require('dotenv').config();

// express
const express = require('express');
const app = express();

// controller imports
const admin = require('./controllers/admin.controller');
const post = require('./controllers/post.controller');
const site = require('./controllers/site.controller')

// db import and sync
const sequelize = require('./db');
sequelize.sync();
// sequelize.sync({ force: true }); 

app.use(express.json());

// middleware
app.use(require('./middleware/headers'));

// routes
app.use('/admin', admin);
app.use('/site', site);
app.use(require('./middleware/validate-session'));
app.use('/post', post);


app.listen(process.env.PORT, () => console.log('app is listening on port 3001'));