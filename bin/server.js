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

function onError(error) {
  if (error.syscall != 'listen') {
    throw err;
  }

  const bind = typeof port = 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  // Handle specific listen errors with friendly messages
  if (error.code === 'EACCES') {
    log.fatal(`${bind} requires elevated privileges`);
    process.exit(1);
  } else if (error.code === 'EADDRINUSE') {
    log.fatal(`${bind} is already in use`);
    process.exit(1);
  } else {
     throw err;
  }
}

const server = http.createServer(app);
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
  ? `pipe ${addr}`
  : `port ${addr.port}`

  log.info(`${config.applicationName} listening on ${bind}` );
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);