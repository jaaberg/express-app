exports = module.exports = function() {
  return function(req, res) {
    res.render('index', {
      title: 'Welcome'
    });
  }
};
