require('dotenv').config();

const defaultHeaders = (req, res, next) => {
  console.log('era pra ta aqui', process.env.APP_URI);
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_URI);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  return next();
};

module.exports = defaultHeaders;
