exports = module.exports = function(app, express, handlers, path) {
  app.use(path, require('./404')(express, handlers, '*'));
};
