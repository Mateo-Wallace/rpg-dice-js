const { evaluate } = require("mathjs");
const { spaceNormalizer, diceNoInput, diceInputMathLogic } = require("./utils");

const rollMethod = ({ userInput, isBoldCrit }) => {
  // defines separators in order to parse through user input
  const separators = ["+", "-", "*", "/"];
  // defines normalized user input as message
  const message = spaceNormalizer(userInput, separators);
  // splits message into an array
  const messageWords = message ? message.split(" ") : [];
  // sets up return variables to be edited later
  var total, sumTotal, critTotal;

  try {
    // if no input, rolls 1d20
    if (messageWords.length === 0) {
      const data = diceNoInput(isBoldCrit);
      sumTotal = data.sumTotal;
      critTotal = data.critTotal;
      total = data.total;
    }
    // else if input, parse through input to run dice logic
    else {
      // runs through all values within messageWords array, determines what the input was, and pushes the math to the resultWords array
      var resultWords = diceInputMathLogic(messageWords, separators);

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
        } else if (separators.includes(resultWords[i])) {
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
    prefab: `Input: ${message}  |  Result: ${total}  |  Total: ${sumTotal}`,
    input: message,
    inputArray: messageWords,
    total,
    totalArray: total.split(/(?!\(.*)\s(?![^(]*?\))/g), //regex to split where spaces unless wrapped by parentheses
    totalSum: sumTotal,
    totalCrit: critTotal,
  };
};

module.exports = rollMethod;
