import { randomNumber } from "./lib";

test("random number is at least 0", () => {
  expect(randomNumber()).toBeGreaterThanOrEqual(0);
});

test("random number is at most 9", () => {
  expect(randomNumber()).toBeLessThanOrEqual(9);
});
