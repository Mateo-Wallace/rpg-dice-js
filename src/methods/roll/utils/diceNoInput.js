const diceNoInput = (defaultDie, isBoldCrit, boldWrapper) => {
  const sum = Math.floor(Math.random() * defaultDie) + 1;
  const sumTotal = `${sum}`;
  const critTotal = `${sum * 2}`;
  const total = `d${defaultDie} (${
    isBoldCrit
      ? sum == 1 || sum == defaultDie
        ? `${boldWrapper[0]}${sum}${boldWrapper[1]}`
        : sum
      : sum
  })`;

  return { sumTotal, critTotal, total };
};

module.exports = diceNoInput;
