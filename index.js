import Dice from "./models/Dice.js";

const roll = (userInput, diceSettings) => {
  if (!diceSettings) {
    diceSettings = {};
  }
  return new Dice(diceSettings).roll(userInput);
};

export default roll;
