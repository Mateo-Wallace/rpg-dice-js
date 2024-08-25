import roll from "../src/index";
import chai from "chai";
import spies from "chai-spies";
const { assert, expect } = chai;
chai.use(spies);
import crypto from "crypto";

describe("Tests basic roll", () => {
  it("Should return the correct string without randomness", () => {
    function rollTest(input, expected, message, settings) {
      chai.spy.on(crypto, "randomInt", () => 1);
      const actual = roll(input, settings);
      chai.spy.restore(crypto);
      assert.strictEqual(actual.result, expected, message);
    }

    rollTest("1d1", "1d1 (1)", "1");
    rollTest("1d20", "1d20 (1)", "Single die");
    rollTest("3d6", "3d6 (1, 1, 1)", "Multiple same dice");
    rollTest("1D6", "1d6 (1)", "Capital D");
    rollTest("1d6 + 1", "1d6 (1) + 1", "Math");
    rollTest("1d6+1  - 2", "1d6 (1) + 1 - 2", "Spacing");
    rollTest("2d6 - 2d4", "2d6 (1, 1) - 2d4 (1, 1)", "Multiple different dice");
    rollTest(undefined, "d20 (1)", "No input");
    rollTest("d6", "d6 (1)", "No number of dice");
    rollTest(undefined, "d6 (1)", "Settings default die", { defaultDie: 6 });
    rollTest("1d2", "1d2 (**1**)", "Settings bold crit", { isBoldCrit: true });
    rollTest("1d2", "1d2 (<b>1</b>)", "Settings bold wrapper", {
      isBoldCrit: true,
      boldWrapper: ["<b>", "</b>"],
    });
  });

  it("Should return a total within the available range for 100 tries", () => {
    function rangeTest(input, range, message) {
      const total = roll(input).total;
      const isInRange = total >= range[0] && total <= range[1];
      const expected = true;
      assert.strictEqual(isInRange, expected, message);
    }

    // website for easy range calc https://anydice.com/
    for (let i = 0; i < 100; i++) {
      rangeTest("1d1", [1, 1], "Range of 1");
      rangeTest("1d20", [1, 20], "Range of single die");
      rangeTest("3d6", [3, 18], "Range of multiple same dice");
      rangeTest("1d6 + 1", [2, 7], "Range of math");
      rangeTest("2d6 - 2d4", [-6, 10], "Range of multiple different dice");
    }
  });

  it("Should have the correct values for the response object", () => {
    function objTest(input, expected, message) {
      chai.spy.on(crypto, "randomInt", () => 1);
      const actual = roll(input);
      chai.spy.restore(crypto);
      assert.deepEqual(actual, expected, message);
    }

    let obj = {
      ok: true,
      input: "1d1",
      result: "1d1 (1)",
      total: 1,
      resultNoDice: "(1)",
      prefab: "Input: 1d1  |  Result: 1d1 (1)  |  Total: 1",
      inputArray: ["1d1"],
      resultArray: ["1d1", "(1)"],
      resultNoDiceArray: ["(1)"],
      totalCrit: 2,
    };
    objTest("1d1", obj, "1 test");

    obj = {
      ok: true,
      input: "1d20 + 5",
      result: "1d20 (1) + 5",
      total: 6,
      resultNoDice: "(1) + 5",
      prefab: "Input: 1d20 + 5  |  Result: 1d20 (1) + 5  |  Total: 6",
      inputArray: ["1d20", "+", "5"],
      resultArray: ["1d20", "(1)", "+", "5"],
      resultNoDiceArray: ["(1)", "+", "5"],
      totalCrit: 7,
    };
    objTest("1d20 + 5", obj, "Math test");
  });

  it("Should throw an error if input or settings are passed incorrect data types", () => {
    function errTest(input, settings) {
      expect(roll.bind(roll, input, settings)).to.throw();
    }

    errTest(null);
    errTest([]);
    errTest({});
    errTest(1);
    errTest(() => "");
    errTest(undefined, null);
    errTest(undefined, []);
    errTest(undefined, "");
    errTest(undefined, 1);
    errTest(undefined, () => "");
  });

  it("Should not throw an error but respond with invalid input if given a string improperly formatted", () => {
    function invalidTest(input, message) {
      const actual = roll(input).ok;
      const expected = false;
      assert.deepEqual(actual, expected, message);
    }

    invalidTest("Hello World", "Sentence");
    invalidTest("1d20 + 3h10", "Letter");
    invalidTest("1d20 + * 5", "Multiple math");
    invalidTest("oned20", "Number written as word");
  });
});
