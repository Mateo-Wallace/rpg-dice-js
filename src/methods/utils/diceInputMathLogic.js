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

export default diceInputMathLogic;
