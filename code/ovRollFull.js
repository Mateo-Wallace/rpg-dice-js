// require
const { roll } = require("rpg-dice-js");

// example userInput, change this value to change what is fed to the dice roll
const userInput = "1d20 + 5";

// roll dice and respond with the result
const result = roll(userInput).result;

// write the result in console
console.log(result);