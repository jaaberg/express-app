exports = module.exports = function(mailchimp) {
  return {
    mailchimp: require('./mailchimp')(mailchimp)
  };
};
