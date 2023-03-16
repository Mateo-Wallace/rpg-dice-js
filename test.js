const { Dice, roll } = require("./index.js");

const d20 = new Dice({
  defaultDie: "10",
  isBoldCrit: 1,
  boldWrapper: ["<", ">"],
});

const isClass = 1;

const consoleString = "";

console.log(isClass ? d20.roll(consoleString) : roll(consoleString));
