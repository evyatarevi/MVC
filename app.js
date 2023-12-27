const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

const db = require('./data/database');
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const sessionConfig = require('./config/session');
const authMiddleware = require('./middlewares/auth-middleware');
const csrfTokenMiddleware = require('./middlewares/csrf-token-middleware');

const mongodbSessionStore = sessionConfig.createSessionStore(session);
const sessionConfigObject = sessionConfig.createSessionConfig(mongodbSessionStore);

const app = express();



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionConfigObject));
app.use(csrf());

app.use(csrfTokenMiddleware);
app.use(authMiddleware);
/*
unlike csrf or urlencoded and all these other third-party middlewares I added, this doesn't need to be executed.
Because these functions which are coming from third party packages are actually not the middlewares themselves,
instead these are in the end, all configuration functions which take configuration options and will return us 
the actual middleware. In case of authMiddleware I directly defined the middleware function itself.
*/

app.use(blogRoutes);
app.use(authRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});
