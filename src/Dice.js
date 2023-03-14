const { evaluate } = require("mathjs");

class Dice {
  constructor({ settings = { boldCrit: false } }) {
    this.boldCrit = settings.boldCrit;
  }
  roll() {
    return this.boldCrit;
  }
}

module.exports = Dice;
