exports = module.exports = function(app, express, handlers, path) {
  app.use(path, require('./front-page')(express, handlers, '/'));
};
