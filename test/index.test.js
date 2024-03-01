import roll from "../index.js";

import chai from "chai";
const expect = chai.expect;
const { strictEqual, deepEqual } = chai.assert;

import spies from "chai-spies";
chai.use(spies);
chai.spy.on(Math, "floor", () => 0);

function rollTest(input, expected, message) {
  const actual = roll(input);
  strictEqual(actual.result, expected, message);
}

function errTest(userInput) {
  expect(roll.bind(roll, userInput)).to.throw();
}

describe("Tests roll function", () => {
  it("Fixed tests", () => {
    rollTest("1d1", "1d1 (1)", "Single die test");
    rollTest("3d6", "3d6 (1, 1, 1)", "Multiple same dice test");
    rollTest("1D6", "1d6 (1)", "Capital D test");
    rollTest("1d6 + 1", "1d6 (1) + 1", "Math test");
    rollTest("1d6+1", "1d6 (1) + 1", "Spacing test");
    rollTest(
      "2d6 - 2d4",
      "2d6 (1, 1) - 2d4 (1, 1)",
      "Multiple different dice test"
    );
  });

  it("Edge case tests", () => {
    rollTest(undefined, "d20 (1)", "No input test");
    rollTest("d6", "d6 (1)", "No number of dice test");
  });

  it("Error tests", () => {
    errTest(null);
    errTest([]);
    errTest({});
    errTest(1);
    errTest(() => "");
  });
});
