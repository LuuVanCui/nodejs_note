const express = require('express');
const exHandlebar  = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');  
const passport = require('passport');

const route = require('./resources/routes')
const db = require('./config/db');

const app = express();
const port = 3000;

// Connect to DB
db.connect();

// Use session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));

app.use(passport.initialize());
app.use(passport.session());

// Use body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'))

app.use(cookieParser());

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.engine('hbs', exHandlebar({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Cookie
app.use(cookieParser());

route(app);

app.listen(port, () => {
    console.log(`Note app is listening on port ${port}`);
});
