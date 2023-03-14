const { evaluate } = require("mathjs");

const diceRoller = ({ userInput, settings }) => {
  // if input then remove all spaces, then add spaces around math operators
  var spaceNormalizer = "";
  if (userInput) {
    spaceNormalizer = userInput.replaceAll(" ", "").toLowerCase();
    var separators = ["+", "-", "*", "/"];

    for (var i = 0; i < separators.length; i++) {
      var rg = new RegExp("\\" + separators[i], "g");
      spaceNormalizer = spaceNormalizer.replace(rg, " " + separators[i] + " ");
    }
  }

  // defines normalized user input as message
  const message = spaceNormalizer;

  // splits message into an array, allowing for the user to target specific positions in the message
  var messageWords = [];
  if (message) {
    var array = message.split(" ");
    array.map((word) => {
      messageWords.push(word);
    });
  }

  var total, sumTotal;
  try {
    // if no input, rolls 1d20
    if (messageWords.length === 0) {
      const sum = Math.floor(Math.random() * 20) + 1;
      total = `1d20 (${sum == 1 || sum == 20 ? `**${sum}**` : sum})`;
      sumTotal = `${sum}`;
    }
    // else if input, parse through input to run dice logic
    else {
      // runs through all values within messageWords array, determines what the input was, and pushes the math to the resultWords array if applicable
      var resultWords = [];
      messageWords.map((word) => {
        // if the word includes a d for dice then run dice logic
        if (word.includes("d")) {
          let sides = 20; // !roll 20
          let rolls = 1;
          if (!isNaN(word[0] / 1) && word.includes("d")) {
            // !roll 4d20
            rolls = word.split("d")[0] / 1;
            sides = word.split("d")[1];
          } else if (word[0] == "d") {
            // !roll d20
            sides = word.slice(1);
          }
          sides = sides / 1; // convert to number
          if (isNaN(sides) || isNaN(rolls)) {
            return resultWords.push(`error`);
          }
          if (rolls > 1) {
            const rollResults = [];
            for (let i = 0; i < rolls; i++) {
              rollResults.push(Math.floor(Math.random() * sides) + 1);
            }
            const sum = rollResults.reduce((a, b) => a + b);
            rollResults.push(sum);
            return resultWords.push(rollResults);
          } else {
            return resultWords.push(Math.floor(Math.random() * sides) + 1);
          }
        }
        // if word is a math operator or a number simply push the word
        else if (separators.includes(word) || !isNaN(word / 1)) {
          return resultWords.push(word);
        }
        // if no valid inputs push error to the array
        else {
          return resultWords.push("error");
        }
      });
      if (resultWords.includes("error")) {
        throw Error("Invalid Input");
      } 
    }
  } catch (e) {
    return { errorMessage: "Fatal", e };
  }

  // sends data back to user with various options
  return {
    input: message,
    inputArray: messageWords,
    total,
    // totalArray: total.split(" "),
    sumTotal,
  };
};

module.exports = diceRoller;
