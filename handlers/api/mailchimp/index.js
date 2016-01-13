exports = module.exports = function(mailchimp) {
  return {
    subscribe: require('./subscribe')(mailchimp)
  };
};
