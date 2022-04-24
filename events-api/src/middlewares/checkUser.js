const jwt = require('../utils/jwt');
const ErrorHandler = require('../utils/ErrorHandler');
const readProps = require('../utils/readProps');

async function checkAuth(req, res, next) {
  const token = req.headers.authorization;
  console.log('tokeke', token);

  if (!token) {
    return res.sendError(
      ErrorHandler.createError(401, readProps('unauthorized')),
    );
  }

  jwt.verify(token, (error, decoded) => {
    if (error) {
      return res.sendError(
        ErrorHandler.createError(401, readProps('user_unauthorized')),
      );
    }

    req.tokenPayload = decoded;
    return next();
  });
}

module.exports = checkAuth;
