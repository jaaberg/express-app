var recursiveReaddir = require('recursive-readdir');
var pathUtil = require('path');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');

module.exports.configureExpress = function(options, app) {
  // view engine setup
  app.set('views', path.join(options.dir, '/views'));
  app.set('view engine', 'hbs');
  app.engine('hbs', options.handlebars.__express);

  app.use(compression());
  app.use(options.express.static(path.join(options.dir, '/client/public')));
  app.use(logger('dev'));
  app.use(options.cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(favicon(options.dir + '/client/public/favicon.ico'));

// development error handler
// will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

// production error handler
// no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
};

// register handlebars partials
module.exports.registerPartials = function(path, handlebars) {
  recursiveReaddir(path, function(err, files) {
    for (var i = 0; i < files.length; i++) {
      var extension = files[i].split('.')[1];
      if (extension != 'hbs') {
        continue;
      }
      var extensionLength = 'hbs'.length + 1;

      var partial = files[i].split(pathUtil.sep).slice(2).join('-').slice(0, -extensionLength);
      var source = fs.readFileSync(files[i], 'utf8');
      handlebars.registerPartial(partial, source);
    }
  });
};

// register handlebars block helpers
module.exports.registerHelpers = function(helpers, handlebars) {
  for (var helper in helpers) {
    if (helpers.hasOwnProperty(helper)) {
      handlebars.registerHelper(helper, helpers[helper]);
    }
  }
};