const { evaluate } = require("mathjs");

const diceRoller = ({ userInput, isBoldCrit }) => {
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

  var total, sumTotal, critTotal;
  try {
    // if no input, rolls 1d20
    if (messageWords.length === 0) {
      const sum = Math.floor(Math.random() * 20) + 1;
      sumTotal = `${sum}`;
      critTotal = `${sum * 2}`;
      total = `1d20 (${
        isBoldCrit ? (sum == 1 || sum == 20 ? `**${sum}**` : sum) : sum
      })`;
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

      var result = [];
      var sum = [];
      var crit = [];
      for (let i = 0; i < resultWords.length; i++) {
        const boldCrit = isBoldCrit
          ? resultWords[i] == 1 ||
            resultWords[i] == messageWords[i].split("d")[1] / 1
            ? `**${resultWords[i]}**`
            : resultWords[i]
          : resultWords[i];
        if (messageWords[i].includes("d") && !isNaN(resultWords[i] / 1)) {
          sum.push(resultWords[i]);
          crit.push(resultWords[i] * 2);
          result.push(`${messageWords[i]} (${boldCrit})`);
        } else if (
          resultWords[i] == "+" ||
          resultWords[i] == "-" ||
          resultWords[i] == "*" ||
          resultWords[i] == "/"
        ) {
          sum.push(resultWords[i]);
          crit.push(resultWords[i]);
          result.push(`${resultWords[i]}`);
        } else if (!isNaN(resultWords[i] / 1)) {
          sum.push(resultWords[i]);
          crit.push(resultWords[i]);
          result.push(`${boldCrit}`);
        } else if (resultWords[i].constructor === Array) {
          var popped = resultWords[i].pop();
          sum.push(popped);
          crit.push(popped * 2);
          var arr = [];
          for (let j = 0; j < resultWords[i].length; j++) {
            const boldCritArr = isBoldCrit
              ? resultWords[i][j] == 1 ||
                resultWords[i][j] == messageWords[i].split("d")[1] / 1
                ? `**${resultWords[i][j]}**`
                : resultWords[i][j]
              : resultWords[i][j];
            if (j == resultWords[i].length - 1) {
              arr.push(` ${boldCritArr}`);
            } else if (j == 0) {
              arr.push(`${boldCritArr}`);
            } else {
              arr.push(` ${boldCritArr}`);
            }
          }
          result.push(`${messageWords[i]} (${arr})`);
        }
      }
      total = result.join(" ");
      sumTotal = evaluate(sum.join(" "));
      critTotal = evaluate(crit.join(" "));
    }
  } catch (e) {
    return { errorMessage: "Fatal Error", e };
  }

  // sends data back to user with various options
  return {
    prefab: `Input: ${message} \nResult: ${total} \nTotal: ${sumTotal}`,
    input: message,
    inputArray: messageWords,
    total,
    totalArray: total.split(/(?!\(.*)\s(?![^(]*?\))/g), //regex to split where spaces unless wrapped by parentheses
    totalSum: sumTotal,
    totalCrit: critTotal,
  };
};

module.exports = diceRoller;
