const {
  spaceNormalizer,
  diceNoInput,
  diceInputMathLogic,
  diceInput,
  splitFilterJoin,
} = require("./utils");

const rollMethod = ({ userInput, isBoldCrit, defaultDie, boldWrapper }) => {
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
    if (!messageWords.length) {
      const data = diceNoInput(defaultDie, isBoldCrit, boldWrapper);

      sumTotal = data.sumTotal;
      critTotal = data.critTotal;
      total = data.total;
    }
    // else if input, parse through input to run dice logic
    else {
      // runs through all values within messageWords array, determines what the input was, and pushes the math to the resultWords array
      const resultWords = diceInputMathLogic(messageWords, separators);

      const data = diceInput(
        messageWords,
        resultWords,
        separators,
        isBoldCrit,
        boldWrapper
      );

      sumTotal = data.sumTotal;
      critTotal = data.critTotal;
      total = data.total;
    }
  } catch (e) {
    return { ok: false, errorMessage: "Fatal Error", e };
  }

  // sends data back to user with various options
  return {
    ok: true,
    input: message,
    result: total,
    total: sumTotal,
    resultNoDice: splitFilterJoin(total, 3),
    prefab: `Input: ${message}  |  Result: ${total}  |  Total: ${sumTotal}`,
    inputArray: messageWords,
    resultArray: splitFilterJoin(total, 1), //regex to split where spaces unless wrapped by parentheses
    resultNoDiceArray: splitFilterJoin(total, 2),
    totalCrit: critTotal,
  };
};

module.exports = rollMethod;
