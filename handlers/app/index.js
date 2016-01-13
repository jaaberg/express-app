exports = module.exports = function() {
  return {
    frontPage: require('./front-page')(),
    error: require('./error')()
  }
};
