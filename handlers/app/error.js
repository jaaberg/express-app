exports = module.exports = function() {
  return function(req, res) {
    res.status(404).render('error', {
      error: 'No such URL'
    });

  };
};
