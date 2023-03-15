const diceNoInput = (isBoldCrit) => {
  const sum = Math.floor(Math.random() * 20) + 1;
  sumTotal = `${sum}`;
  critTotal = `${sum * 2}`;
  total = `1d20 (${
    isBoldCrit ? (sum == 1 || sum == 20 ? `**${sum}**` : sum) : sum
  })`;

  return { sumTotal, critTotal, total };
};

module.exports = diceNoInput;
