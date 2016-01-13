exports = module.exports = function(mailchimp) {
  return {
    app: require('./app')(),
    api: require('./api')(mailchimp)
  }
};
