exports = module.exports = function(app, express, handlers) {
  require('./app')(app, express, handlers, '/');
  require('./api')(app, express, handlers, '/api');
  require('./error')(app, express, handlers, '*');
};
