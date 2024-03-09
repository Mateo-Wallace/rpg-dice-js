import Dice from "./models/Dice.js";

/**
 * Call the roll method of the dice class.
 * @param {string} userInput - The user input for the dice roll.
 * @param {Object} diceSettings - The settings for the Dice Class.
 * @return {Object} The result of the dice roll.
 */
const roll = (userInput, diceSettings) => {
  if (diceSettings === undefined) diceSettings = {};
  const type = Object.prototype.toString.call(diceSettings).slice(8, -1);
  if (type !== "Object")
    throw new Error(`Settings must be an object X ${type}`);

  return new Dice(diceSettings).roll(userInput);
};

export default roll;
