const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const routeHandler = require('./routes');

module.exports = (config) => {
  const app = express();

  // static folder for view
  app.use(express.static(path.join(__dirname, 'public')));

  // parse incoming request body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: fasle }));

  app.set('trsut proxy', 1);
  app.use(session({
    secret: 'very secret to encrypt session',
    resave: false,
    saveUninitialized: false,
  }));
}