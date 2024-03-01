const responseFilter = (response, responseOptions) => {
  const onlyTrueObj = {};
  for (const key in responseOptions) {
    if (responseOptions[key] === true) {
      onlyTrueObj[key] = response[key];
    }
  }

  return onlyTrueObj;
};

export default responseFilter;