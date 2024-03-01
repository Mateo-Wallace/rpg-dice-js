import roll from "../index.js";

import chai from "chai";
import spies from "chai-spies";
const { assert, expect } = chai;
chai.use(spies);

describe("Tests basic roll", () => {
  it("Should return the correct string without randomness", () => {
    function rollTest(input, expected, message) {
      chai.spy.on(Math, "floor", () => 0);
      const actual = roll(input);
      assert.strictEqual(actual.result, expected, message);
      chai.spy.restore(Math);
    }

    rollTest("1d1", "1d1 (1)", "1 test");
    rollTest("1d20", "1d20 (1)", "Single die test");
    rollTest("3d6", "3d6 (1, 1, 1)", "Multiple same dice test");
    rollTest("1D6", "1d6 (1)", "Capital D test");
    rollTest("1d6 + 1", "1d6 (1) + 1", "Math test");
    rollTest("1d6+1", "1d6 (1) + 1", "Spacing test");
    rollTest(
      "2d6 - 2d4",
      "2d6 (1, 1) - 2d4 (1, 1)",
      "Multiple different dice test"
    );
    rollTest(undefined, "d20 (1)", "No input test");
    rollTest("d6", "d6 (1)", "No number of dice test");
  });

  it("Should throw an error if given an input other than a string or undefined", () => {
    function errTest(userInput) {
      expect(roll.bind(roll, userInput)).to.throw();
    }

    errTest(null);
    errTest([]);
    errTest({});
    errTest(1);
    errTest(() => "");
  });

  it("Should return a total within the available range", () => {
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
});

// describe("Tests roll with settings", () => {

// });
