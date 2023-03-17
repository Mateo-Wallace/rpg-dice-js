const { roll } = require("rpg-dice-js");

const exampleInput = "1d20 + 5";

// just sending an input through the array will return an object
// the most important items within that object are:
// input, result, & total
console.log(roll(exampleInput));

// example output:
