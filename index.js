const Dice = require("./src/Dice.js");

const d20 = new Dice();

const roll = (userInput) => {
  return d20.roll(userInput);
};

module.exports = { Dice, roll };
