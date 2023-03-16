const Dice = require("./src/Dice.js");

const roll = (userInput) => {
  return new Dice().roll(userInput);
};

module.exports = { Dice, roll };
