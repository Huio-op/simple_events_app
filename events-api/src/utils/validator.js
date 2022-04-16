const checkRequestParams = (values) => {
  let emptyValues = [];
  Object.entries(values).forEach(([key, value], index) => {
    if (value === '' || value === undefined) {
      emptyValues.push(`${index > 0 ? ' ' : ''}${key}`);
    }
  });
  return emptyValues;
};

module.exports = {
  checkRequestParams,
};
