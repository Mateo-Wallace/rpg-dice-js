import Dice from "./models/Dice.js";

const roll = (userInput, diceSettings) => {
  if (diceSettings === undefined) diceSettings = {};
  const type = Object.prototype.toString.call(diceSettings).slice(8, -1);
  if (type !== "Object")
    throw new Error(`Settings must be an object X ${type}`);

  return new Dice(diceSettings).roll(userInput);
};

export default roll;
