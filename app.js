require('dotenv').config();

// express
const express = require('express');
const db = require('./db');
const app = express();

// controller imports
const admin = require('./controllers/admin.controller');
const post = require('./controllers/post.controller');
const site = require('./controllers/site.controller');
const project = require('./controllers/project.controller')

app.use(express.json());

// middleware
app.use(require('./middleware/headers'));

// routes
app.use('/site', site);
app.use('/admin', admin);
app.use(require('./middleware/validate-session'));
app.use('/post', post);
app.use('/project', project);


db.authenticate()
  .then(() => db.sync())
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server listening on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });