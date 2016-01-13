var winston = require('winston');

var environment = process.env.NODE_ENV;

var addTimestamp = true;
var useJSON = true;

if (environment == 'production' || environment == 'staging') {
  addTimestamp = false;
  useJSON = false;
}

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({json: false, timestamp: addTimestamp, colorize: true})
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({json: useJSON, timestamp: addTimestamp, colorize: true})
  ],
  exitOnError: false
});

exports.logger = logger;
