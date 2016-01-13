global.rootRequire = function(name) {
  return require(__dirname + '/' + name);
};

var express = require('express');
var cookieParser = require('cookie-parser');
var hbs = require('hbs');

var app = express();

var helpers = require('./helpers')();
var setup = require('./setup');
var config = require('./config');
var services = require('./services')();

var mailchimp = require('./modules/mailchimp.js')(config);

var handlers = require('./handlers')(mailchimp);

// handlebars setup
setup.registerPartials('./views/partials/', hbs);
setup.registerHelpers(helpers.handlebars(), hbs);

setup.configureExpress({
  express: express,
  handlebars: hbs,
  cookieParser: cookieParser,
  dir: __dirname
}, app);

require('./routes/index')(app, express, handlers);

module.exports = app;
