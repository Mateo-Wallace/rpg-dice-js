const rollMethod = require("./methods/roll/roll.js");

class Dice {
  // defines variables for a new Dice class
  constructor(settings = { isBoldCrit: false, noInputDefaultDie: "20" }) {
    this.settings = settings;
  }

  // roll method calls logic to roll dice based on various types of user input
  // example: 1d20, 1d6 + 2, 12d30*4 - 7D6
  roll(userInput) {
    return rollMethod({ userInput, ...this.settings });
  }

  currentSettings() {
    return this.settings;
  }
}

module.exports = Dice;
