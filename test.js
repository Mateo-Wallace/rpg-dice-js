const { Dice, roll } = require("./index.js");

const d20 = new Dice({ isBoldCrit: true });

console.log(d20.roll("1d20 + 5 + 1 + 1d6"));
