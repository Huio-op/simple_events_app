const jwt = require('jsonwebtoken');

module.exports = {
  generate(payload) {
    return jwt.sign({ ...payload }, process.env.AUTH_SECRET);
  },

  verify(token, callback) {
    jwt.verify(token, process.env.AUTH_SECRET, AUTH_SECRET);
  },
};
