const { evaluate } = require("mathjs");

const diceInput = (messageWords, resultWords, separators, isBoldCrit) => {
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

  return { total, sumTotal, critTotal };
};

module.exports = diceInput;
