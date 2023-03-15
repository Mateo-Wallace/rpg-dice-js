const Dice = require("./src/Dice.js");
const diceRoller = require("./src/methods/roll.js");

const roll = (userInput) => {
  return diceRoller({ userInput, isBoldCrit: false });
};

module.exports = {Dice, roll};
