exports = module.exports = function(express, handlers, path) {
  var router = express();

  router.route(path)
    .post(handlers.api.mailchimp.subscribe);

  return router;
};
