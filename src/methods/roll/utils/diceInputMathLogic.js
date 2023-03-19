const diceInputMathLogic = (messageWords, separators) => {
  var resultWords = [];
  messageWords.map((word) => {
    // if the word includes a d for dice then run dice logic
    if (word.includes("d")) {
      let sides = 20; // !roll 20
      let rolls = 1;
      // checks if the first letter of the string is a number, and checks is the string includes a d
      // ex: 1d20
      if (!isNaN(word[0] / 1) && word.includes("d")) {
        rolls = word.split("d")[0] / 1;
        sides = word.split("d")[1] / 1;
      }
      // checks if first letter is d
      // ex: d20
      else if (word[0] == "d") {
        sides = word.slice(1) / 1;
      } else {
        sides = NaN;
      }
      // if text before or after d is not a number, throw error
      if (isNaN(sides) || isNaN(rolls)) {
        throw Error("Invalid Input");
      }

      // if multiple rolls, push an array of dice roll results
      if (rolls > 1) {
        const rollResults = [];
        for (let i = 0; i < rolls; i++) {
          rollResults.push(Math.floor(Math.random() * sides) + 1);
        }
        const sum = rollResults.reduce((a, b) => a + b);
        rollResults.push(sum);
        return resultWords.push(rollResults);
      }
      // if single roll, push dice roll result
      else {
        return resultWords.push(Math.floor(Math.random() * sides) + 1);
      }
    }
    // if word is a math operator or a number simply push the word
    else if (separators.includes(word) || !isNaN(word / 1)) {
      return resultWords.push(word);
    }
    // if no valid inputs push error to the array
    else {
      throw Error("Invalid Input");
    }
  });

  return resultWords;
};

module.exports = diceInputMathLogic;
