import rollMethod from "../methods/roll.js";

/**
 * Class representing a dice.
 */
class Dice {
  /**
   * Create a dice.
   * @param {Object} options - The options for the dice.
   */
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

  /**
   * Roll the dice.
   * @param {string} userInput - The user input for the dice roll.
   * @return {Object} The result of the dice roll.
   */
  roll(userInput) {
    if (userInput !== undefined && typeof userInput !== "string") {
      throw new Error(
        `User input must be a string or empty. Not ${typeof userInput}`
      );
    }

    try {
      return rollMethod({ userInput, ...this.settings });
    } catch (error) {
      console.error("Error rolling dice:", error);
      return null;
    }
  }
}

export default Dice;
