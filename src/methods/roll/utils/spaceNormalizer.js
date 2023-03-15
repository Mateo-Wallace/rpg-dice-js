const spaceNormalizer = (userInput, separators) => {
  // if input then remove all spaces, then add spaces around math operators
  var spaceNormalize = "";
  if (userInput) {
    spaceNormalize = userInput.replaceAll(" ", "").toLowerCase();

    for (var i = 0; i < separators.length; i++) {
      var rg = new RegExp("\\" + separators[i], "g");
      spaceNormalize = spaceNormalize.replace(rg, " " + separators[i] + " ");
    }
  }
  return spaceNormalize;
};

module.exports = spaceNormalizer;
