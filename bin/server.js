// Dependencies

const http = require('http');
const config = require('../config/index');
const App = require('../app');
const mongoose = require('mongoose');

const log = config.logger;

// Connect to mongodb
mongoose.connect(config.mongodb.dsn)
  .then(() => {
    log.info('Sucessfully connected to Mongodb');
  });

// Logic to start the application
const app = App(config);
const port = process.env.PORT || '3000';
app.set('port', port);