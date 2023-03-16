const { evaluate } = require("mathjs");

const diceInput = (messageWords, resultWords, separators, isBoldCrit) => {
  var result = [];
  var sum = [];
  var crit = [];

  // loops through all items within result words array and formats them correctly
  for (let i = 0; i < resultWords.length; i++) {
    // boldCrit determines if isBoldCrit setting is turned on or off
    // then if resultWord is the lowest or highest number possible, it adds ** around the word
    const boldCrit = isBoldCrit
      ? resultWords[i] == 1 ||
        resultWords[i] == messageWords[i].split("d")[1] / 1
        ? `**${resultWords[i]}**`
        : resultWords[i]
      : resultWords[i];

    // checks if the messageWord includes d and if the resultWord is a number
    if (messageWords[i].includes("d") && !isNaN(resultWords[i] / 1)) {
      sum.push(resultWords[i]);
      crit.push(resultWords[i] * 2);
      result.push(`${messageWords[i]} (${boldCrit})`);
    }
    // checks if resultWord is a math operator or other defined separator
    // also checks if resultWord is a number
    else if (
      separators.includes(resultWords[i]) ||
      !isNaN(resultWords[i] / 1)
    ) {
      sum.push(resultWords[i]);
      crit.push(resultWords[i]);
      result.push(`${resultWords[i]}`);
    }
    // checks if resultWord is an array, if so run math on all operators
    else if (resultWords[i].constructor === Array) {
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

  const total = result.join(" ");
  const sumTotal = evaluate(sum.join(" "));
  const critTotal = evaluate(crit.join(" "));

  return { total, sumTotal, critTotal };
};

module.exports = diceInput;
