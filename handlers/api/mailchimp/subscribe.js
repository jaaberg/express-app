exports = module.exports = function(mailchimp) {
  return function(req, res) {
    mailchimp.subscribe(req.body.email, req.body.name, req.body.event);
    return res.status(200).send();
  }
};
