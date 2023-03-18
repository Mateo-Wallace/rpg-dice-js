// these are the DEFAULT dice settings
const d20 = new Dice({
  isBoldCrit: false,
  defaultDie: 20,
  boldWrapper: ["**", "**"],

  ok: true,
  input: true,
  result: true,
  total: true,
  resultNoDice: true,
  prefab: true,
  inputArray: true,
  resultArray: true,
  resultNoDiceArray: true,
  totalCrit: true,
});
