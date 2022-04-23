const reader = require('properties-reader');

const readProps = (key, ...args) => {
  let value = reader('src/properties/api.properties').get(key);
  let currentArg = 0;
  args.forEach((arg) => {
    value = value.replace(new RegExp(`\\{${currentArg}\\}`, 'g'), arg);
    currentArg++;
  });
  return value;
};

module.exports = readProps;
