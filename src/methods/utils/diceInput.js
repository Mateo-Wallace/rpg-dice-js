import { evaluate } from "mathjs";

const diceInput = (
  messageWords,
  resultWords,
  separators,
  isBoldCrit,
  boldWrapper
) => {
  const result = [];
  const sum = [];
  const crit = [];

  // loops through all items within result words array and formats them correctly
  for (let i = 0; i < resultWords.length; i++) {
    // boldCrit determines if isBoldCrit setting is turned on or off
    // then if resultWord is the lowest or highest number possible, it adds ** around the word
    const boldCrit = isBoldCrit
      ? resultWords[i] == 1 ||
        resultWords[i] == messageWords[i].split("d")[1] / 1
        ? `${boldWrapper[0]}${resultWords[i]}${boldWrapper[1]}`
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
    else if (Array.isArray(resultWords[i])) {
      const popped = resultWords[i].pop();
      sum.push(popped);
      crit.push(popped * 2);

      const arr = resultWords[i].map((item, j) => {
        const boldCritArr = isBoldCrit
          ? item == 1 ||
            item == messageWords[i].split("d")[1] / 1
            ? `${boldWrapper[0]}${item}${boldWrapper[1]}`
            : item
          : item;

        if (j === resultWords[i].length - 1) {
          return ` ${boldCritArr}`;
        } else if (j === 0) {
          return `${boldCritArr}`;
        } else {
          return ` ${boldCritArr}`;
        }
      });

      result.push(`${messageWords[i]} (${arr})`);
    }
  }

  const total = result.join(" ");
  const sumTotal = evaluate(sum.join(" "));
  const critTotal = evaluate(crit.join(" "));

  return { total, sumTotal, critTotal };
};

export default diceInput;
