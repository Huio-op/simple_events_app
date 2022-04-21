require('dotenv').config();

const defaultHeaders = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_URI);
  return next();
};

module.exports = defaultHeaders;
