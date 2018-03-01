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

 app.get('/favicon.ico', (req, res) => {
  res.status(204);
 });

 app.get('/robots.txt', (req, res) => {
  res.status(204);
 });

 // Define 'global' template variables here
 app.use(async (req, res, next) => {
  // To show the application name on the page
  res.locals.applicationName = config.applicationName;

  // Set up flash messaging
  if (!req.session.messages) {
    req.session.messages = [];
  }
  res.locals.messages = req.session.messages;
  return next();
 });

 app.use('/', routeHandler(config));

 // catch 404 and forward to error handler
 app.use((req, res, next) => {
  const err = new Error(`Not Found (${req.url})`);
  err.status = 404;
  next(err);
 });

 //error handler
 app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.messages = err.message;
  res.locals.error = res.app.get('env') === 'development' ? err : {};
 })
}