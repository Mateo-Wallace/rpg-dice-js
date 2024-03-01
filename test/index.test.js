const { Dice, roll } = require("../index");

const chai = require("chai");
const { strictEqual, deepEqual } = chai.assert;

const spies = require("chai-spies");
chai.use(spies);
chai.spy.on(Math, "floor", () => 0);

describe("Tests roll function", () => {
  function rollTest(input, expected) {
    const actual = roll(input);
    strictEqual(
      actual.result,
      expected,
      `expect ${actual.result} to equal ${expected}\ngiven ${input}\n`
    );
  }

  it("Fixed tests", () => {
    rollTest("1d2", "1d2 (1)");
  });
});

describe("Tests Dice class", () => {
  function diceTest(input, expected) {
    const d20 = new Dice({});
    const actual = d20.roll(input);
    strictEqual(
      actual.result,
      expected,
      `expect ${actual.result} to equal ${expected}\ngiven ${input}\n`
    );
  }

  it("Fixed tests", () => {
    diceTest("1d1", "1d1 (1)");
  });
});
