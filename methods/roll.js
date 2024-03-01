import { evaluate } from "mathjs";

const spaceNormalizer = (userInput, separators) => {
  let spaceNormalize = "";
  
  if (userInput) {
    spaceNormalize = userInput.replaceAll(" ", "").toLowerCase();

    separators.forEach((separator) => {
      const rg = new RegExp(`\\${separator}`, "g");
      spaceNormalize = spaceNormalize.replace(rg, ` ${separator} `);
    });
  }
  
  return spaceNormalize;
};

const diceNoInput = (defaultDie, isBoldCrit, boldWrapper) => {
  const sum = Math.floor(Math.random() * defaultDie) + 1;
  const sumTotal = `${sum}`;
  const critTotal = `${sum * 2}`;
  const total = `d${defaultDie} (${
    isBoldCrit
      ? sum === 1 || sum === defaultDie
        ? `${boldWrapper[0]}${sum}${boldWrapper[1]}`
        : sum
      : sum
  })`;

  return { sumTotal, critTotal, total };
};

const diceInputMathLogic = (messageWords, separators) => {
  const resultWords = [];

  messageWords.forEach((word) => {
    if (word.includes("d")) {
      let sides = 20; // !roll 20
      let rolls = 1;

      if (!isNaN(word[0] / 1) && word.includes("d")) {
        [rolls, sides] = word.split("d").map(Number);
      } else if (word[0] === "d") {
        sides = Number(word.slice(1));
      } else {
        sides = NaN;
      }

      if (isNaN(sides) || isNaN(rolls)) {
        throw new Error("Invalid Input");
      }

      if (rolls > 1) {
        const rollResults = Array.from({ length: rolls }, () =>
          Math.floor(Math.random() * sides) + 1
        );
        const sum = rollResults.reduce((a, b) => a + b);
        rollResults.push(sum);
        resultWords.push(rollResults);
      } else {
        resultWords.push(Math.floor(Math.random() * sides) + 1);
      }
    } else if (separators.includes(word) || !isNaN(word / 1)) {
      resultWords.push(word);
    } else {
      throw new Error("Invalid Input");
    }
  });

  return resultWords;
};

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

  for (let i = 0; i < resultWords.length; i++) {
    const boldCrit = isBoldCrit
      ? resultWords[i] == 1 ||
        resultWords[i] == messageWords[i].split("d")[1] / 1
        ? `${boldWrapper[0]}${resultWords[i]}${boldWrapper[1]}`
        : resultWords[i]
      : resultWords[i];

    if (messageWords[i].includes("d") && !isNaN(resultWords[i] / 1)) {
      sum.push(resultWords[i]);
      crit.push(resultWords[i] * 2);
      result.push(`${messageWords[i]} (${boldCrit})`);
    } else if (
      separators.includes(resultWords[i]) ||
      !isNaN(resultWords[i] / 1)
    ) {
      sum.push(resultWords[i]);
      crit.push(resultWords[i]);
      result.push(`${resultWords[i]}`);
    } else if (Array.isArray(resultWords[i])) {
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

const splitFilterJoin = (total, depth) => {
  const s = total.split(/(?!\(.*)\s(?![^(]*?\))/g);
  const sf = s.filter((value) => !value.includes("d"));
  const sfj = sf.join(" ");

  switch (depth) {
    case 1:
      return s;
    case 2:
      return sf;
    case 3:
      return sfj;
    default:
      return total;
  }
};

const responseFilter = (response, responseOptions) => {
  const onlyTrueObj = {};
  for (const key in responseOptions) {
    if (responseOptions[key] === true) {
      onlyTrueObj[key] = response[key];
    }
  }

  return onlyTrueObj;
};

const rollMethod = ({
  userInput,
  isBoldCrit,
  defaultDie,
  boldWrapper,
  responseOptions,
}) => {
  const separators = ["+", "-", "*", "/"];
  const message = spaceNormalizer(userInput, separators);
  const messageWords = message ? message.split(" ") : [];
  let total, sumTotal, critTotal;

  try {
    if (!messageWords.length) {
      const data = diceNoInput(defaultDie, isBoldCrit, boldWrapper);
      ({ sumTotal, critTotal, total } = data);
    } else {
      const resultWords = diceInputMathLogic(messageWords, separators);
      const data = diceInput(
        messageWords,
        resultWords,
        separators,
        isBoldCrit,
        boldWrapper
      );
      ({ sumTotal, critTotal, total } = data);
    }
  } catch (e) {
    return { ok: false, errorMessage: "Fatal Error", e };
  }

  const responseLayout = {
    ok: true,
    input: message,
    result: total,
    total: sumTotal,
    resultNoDice: splitFilterJoin(total, 3),
    prefab: `Input: ${message}  |  Result: ${total}  |  Total: ${sumTotal}`,
    inputArray: messageWords,
    resultArray: splitFilterJoin(total, 1),
    resultNoDiceArray: splitFilterJoin(total, 2),
    totalCrit: critTotal,
  };

  const response = responseFilter(responseLayout, responseOptions);

  return { ...response };
};

export default rollMethod;
