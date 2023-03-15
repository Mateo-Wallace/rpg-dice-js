const {Dice, roll} = require("./index.js");

const d20 = new Dice({ isBoldCrit: true });

console.log(roll());
