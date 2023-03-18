// require
const { Dice } = require("rpg-dice-js");

// declare new Dice variable
const d20 = new Dice({ isBoldCrit: true });

// example userInput, change this value to change what is fed to the dice roll
const userInput = "1d20 + 5";

// roll dice and respond with the result
const result = d20.roll(userInput).result;

// write the result in console
console.log(result);
