const { evaluate } = require("mathjs");

const diceRoller = ({ userInput, settings }) => {
  // if input then remove all spaces, then add spaces around math operators
  var spaceNormalizer = null;
  if (userInput) {
    spaceNormalizer = userInput.replaceAll(" ", "").toLowerCase();
    var separators = ["+", "-", "*", "/"];

    for (var i = 0; i < separators.length; i++) {
      var rg = new RegExp("\\" + separators[i], "g");
      spaceNormalizer = spaceNormalizer.replace(rg, " " + separators[i] + " ");
    }
  }

  const message = spaceNormalizer;
  var messageWords = [];

  try {
    var array = message.split(" ");
    array.map((word) => {
      messageWords.push(word);
    });
  } catch {}

  return { input: message, arrayInput: messageWords };
};

module.exports = diceRoller;
