const diceRoller = require("./methods/roll.js");

class Dice {
  constructor(settings = { isBoldCrit: false }) {
    this.settings = settings;
  }
  roll(userInput) {
    return diceRoller({ userInput, isBoldCrit: this.settings.isBoldCrit });
  }
}

module.exports = Dice;
