const diceRoller = require("./methods/roll.js");

class Dice {
  constructor(settings = { boldCrit: false }) {
    this.settings = settings;
  }
  roll(userInput) {
    return diceRoller({ userInput, settings: this.settings });
  }
}

module.exports = Dice;
