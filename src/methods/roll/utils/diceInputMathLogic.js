const diceInputMathLogic = (messageWords, separators) => {
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
        throw Error("Invalid Input");
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
      throw Error("Invalid Input");
    }
  });

  return resultWords;
};

module.exports = diceInputMathLogic;
