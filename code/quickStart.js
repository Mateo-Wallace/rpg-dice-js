const { roll } = require("rpg-dice-js");

const exampleInput = "1d20 + 5";

// the roll function responds with an Object
const object = roll(exampleInput);

// to get a specific item within the object add the key after roll
const result = roll(exampleInput).result;
