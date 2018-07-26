#!/usr/bin/env node

// set initial URL path based on the given environment variable
var APP_PATH;
switch (process.env.FIREMUSEUM_APP_NAME) {
  case 'kitchen':
    APP_PATH = 'kitchen';
    return;
  case 'bathroom':
    APP_PATH = 'bathroom';
    return;
  case 'living-room':
    APP_PATH = 'living-room';
    return;
  case 'bedroom':
    APP_PATH = 'bedroom';
    return;
  default:
    APP_PATH = '';
}

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('vue-express-server:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


/*
  Electron settings
*/

var electron = require('electron');
var electronApp = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow;
electronApp.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    electronApp.quit();
  }
});

electronApp.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1920, height: 1080});
  let webContents = mainWindow.webContents;
  webContents.on('did-finish-load', () => {
    webContents.setZoomFactor(1);
    webContents.setVisualZoomLevelLimits(1, 1);
    webContents.setLayoutZoomLevelLimits(0, 0);
  });
  mainWindow.setFullScreen(true);
  mainWindow.loadURL('http://localhost:' + port + '/' + APP_PATH);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
