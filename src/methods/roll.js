import spaceNormalizer from "./utils/spaceNormalizer.js";
import diceNoInput from "./utils/diceNoInput.js";
import diceInputMathLogic from "./utils/diceInputMathLogic.js";
import diceInput from "./utils/diceInput.js";
import splitFilterJoin from "./utils/splitFilterJoin.js";
import responseFilter from "./utils/responseFilter.js";

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
