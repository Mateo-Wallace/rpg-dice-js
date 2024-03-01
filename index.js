import Dice from "./src/Dice.js";

const roll = (userInput) => {
  return new Dice({}).roll(userInput);
};

export default roll;
