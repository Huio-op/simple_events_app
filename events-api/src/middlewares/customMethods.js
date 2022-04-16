const ErrorHandler = require('../utils/ErrorHandler');

const customMethods = (req, res, next) => {
  const errorHandler = new ErrorHandler();
  res.sendOk = ok(req, res);
  res.sendError = errorHandler.getResponseHandler(res);
  res.errorHandler = new ErrorHandler();
  return next();
};

const ok = (req, res) => {
  return async (code, data) => {
    return res.status(code).json(data);
  };
};

module.exports = customMethods;
