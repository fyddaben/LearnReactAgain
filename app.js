var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var http = require('http');
var log4js = require('log4js');

log4js.loadAppender('file');

log4js.addAppender(log4js.appenders.file('logs/app.log'), 'server');

var logger = log4js.getLogger('server');

var app = express();

var env = process.env.NODE_ENV;

var config = require('./config')[env];

//config variable
global.config = config;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var port = config.server_port;
app.set('port', port);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', routes.index);
app.get('/mobile', routes.mobile);
if (env === 'development') {

  var bundle = require('./bundle');
  bundle();
  var httpProxy = require('http-proxy');

  var proxy = httpProxy.createProxyServer();

  var proxyCallback = function(req, res) {
    proxy.web(req, res, {
      target: config.static_path + ':' +  config.static_port
    });
  }

  // to webpack-dev-server
  app.get('/public/*', proxyCallback);
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}


var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
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
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
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
  logger.info('Listening on ' + bind);
}

