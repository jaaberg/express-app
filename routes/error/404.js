exports = module.exports = function(express, handlers, path) {
  var router = express();

  router.route(path)
    .get(handlers.app.error);

  return router;
};
