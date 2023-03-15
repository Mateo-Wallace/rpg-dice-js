const Dice = require("./src/Dice.js");
const rollMethod = require("./src/methods/roll/roll.js");

const roll = (userInput) => {
  return rollMethod({ userInput, isBoldCrit: false });
};

module.exports = {Dice, roll};
