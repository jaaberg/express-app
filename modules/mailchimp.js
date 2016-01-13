var logger = rootRequire('modules/logger.js').logger;
var util = require('util');
var MailChimpAPI = require('mailchimp').MailChimpAPI;

exports = module.exports = function(config) {
  var mcApiKey = config.get('email.mailchimp.api.key');
  var mcApi = new MailChimpAPI(mcApiKey, {version: '2.0'});

  return {
    subscribe: function(email, fullName, event) {
      var params = {
        apikey: mcApiKey,
        email: {email: email},
        double_optin: false
      };

      if (config.get('env') == 'production') {
        mcApi.call('lists', 'subscribe', params, function(error, data) {
          if (error) {
            logger.error('An error occured trying to subscribe a mailchimp list: ' + util.inspect(error.message));
          } else {
            logger.info('An user registered to a mailchimp list: ' + util.inspect(JSON.stringify(data)));
          }
        });
      } else {
        logger.info('Virtual mailchimp subscription with params: ' + util.inspect(params));
      }
    }
  }
};
