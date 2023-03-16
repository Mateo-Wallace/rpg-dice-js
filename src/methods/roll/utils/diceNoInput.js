const diceNoInput = (isBoldCrit, defaultDie) => {
  const sum = Math.floor(Math.random() * defaultDie) + 1;
  const sumTotal = `${sum}`;
  const critTotal = `${sum * 2}`;
  const total = `d${defaultDie} (${
    isBoldCrit ? (sum == 1 || sum == 20 ? `**${sum}**` : sum) : sum
  })`;

  return { sumTotal, critTotal, total };
};

module.exports = diceNoInput;
