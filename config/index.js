var convict = require('convict');

var config = module.exports = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'staging', 'development'],
    default: 'production',
    env: 'NODE_ENV'
  },
  service: {
    name: {
      doc: 'The name of your service/platform.',
      default: 'VideoYolo'
    }
  },
  email: {
    mailchimp: {
      api: {
        key: {
          doc: 'Mailchimp API key.',
          default: '0000000000',
          env: 'MAILCHIMP_API_KEY'
        }
      },
      listId: {
        lss: {
          doc: 'Mailchimp list ID, Lean startup school.',
          default: '0000000000',
          env: 'MAILCHIMP_LIST_ID_LSS'
        },
        event: {
          doc: 'Mailchimp list ID, Events.',
          default: '0000000000',
          env: 'MAILCHIMP_LIST_ID_EVENTS'
        }
      }
    }
  }
});

config.validate();
