//grabs necessary npm packages and routes
const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./controllers');

//establishes app and port
const app = express();
const PORT = process.env.PORT || 3001;

//session variable
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 30*60*1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//middleware for using session and express functions
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//establishes handlebars views
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//tells app to use these routes
app.use(routes);

//establishes the viewing port for the app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});