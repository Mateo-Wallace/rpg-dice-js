const { rollMethod, filterFalse } = require("./methods");

class Dice {
  // defines variables for a new Dice class
  constructor({
    isBoldCrit = false,
    defaultDie = 20,
    boldWrapper = ["**", "**"],

    ok = true,
    input = true,
    result = true,
    total = true,
    resultNoDice = true,
    prefab = true,
    inputArray = true,
    resultArray = true,
    resultNoDiceArray = true,
    totalCrit = true,
  }) {
    this.responseOptions = {
      ok,
      input,
      result,
      total,
      resultNoDice,
      prefab,
      inputArray,
      resultArray,
      resultNoDiceArray,
      totalCrit,
    };
    this.settings = {
      isBoldCrit,
      defaultDie,
      boldWrapper,
      responseOptions: this.responseOptions,
    };
  }

  // roll method calls logic to roll dice based on various types of user input
  // example: 1d20, 1d6 + 2, 12d30*4 - 7D6
  roll(userInput) {
    return rollMethod({ userInput, ...this.settings });
  }
}

module.exports = Dice;
