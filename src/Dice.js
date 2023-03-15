const rollMethod = require("./methods/roll/roll.js");

class Dice {
  constructor(settings = { isBoldCrit: false }) {
    this.settings = settings;
  }
  roll(userInput) {
    return rollMethod({ userInput, isBoldCrit: this.settings.isBoldCrit });
  }
}

module.exports = Dice;
