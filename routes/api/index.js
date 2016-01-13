exports = module.exports = function(app, express, handlers, path) {
  app.use(path, require('./mailchimp/subscribe')(express, handlers, '/mailchimp/subscribe'));
};
