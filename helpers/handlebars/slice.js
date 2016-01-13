exports = module.exports = function() {
  return function(body, from, to) {
    if (!body) {
      return;
    }
    else if (body.length >= to-1) {
      body = body.slice(from, to);
    } else {
      body = body.slice();
    }
    return body;
  }
}
