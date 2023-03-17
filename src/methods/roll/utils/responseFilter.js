const responseFilter = (response, responseOptions) => {
  var onlyTrueObj = {};
  for (const key in responseOptions) {
    if (responseOptions[key] === true) {
      onlyTrueObj[key] = response[key];
    }
  }

  return onlyTrueObj;
};

module.exports = responseFilter;
