const { Dice, roll } = require("./index.js");

const d20 = new Dice({
  defaultDie: "10",
  isBoldCrit: 1,
  boldWrapper: ["<", ">"],
});
const isClass = 0;
const consoleString = "";
// console.log(isClass ? d20.roll(consoleString) : roll(consoleString));
console.log(d20.roll())
// // -----------------
// // Checks to see if calling dice uses default settings

// const noSettings = new Dice({});
// const settingsString = JSON.stringify(noSettings.currentSettings());
// settingsString ==
// `{"isBoldCrit":false,"defaultDie":20,"boldWrapper":["**","**"]}`
//   ? console.log("Default Settings? Passed")
//   : console.trace("Default Settings? Failed");
