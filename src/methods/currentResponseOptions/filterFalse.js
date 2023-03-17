const filterFalse = (obj) => {
  return Object.keys(obj).filter(function (x) {
    return obj[x] !== false;
  });
};

module.exports = filterFalse;
