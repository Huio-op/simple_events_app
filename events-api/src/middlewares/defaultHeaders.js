require('dotenv').config();

const defaultHeaders = (req, res, next) => {
  console.log('era pra ta aqui', process.env.APP_URI);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization',
  );
  return next();
};

module.exports = defaultHeaders;
