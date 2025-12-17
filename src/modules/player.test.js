import Gameboard from "./gameboard.js";
import Player from "./player.js";
jest.mock("./gameboard.js");

beforeEach(() => {
  Gameboard.mockClear();
});

test("Player class calls Gameboard class constructor", () => {
  expect(Gameboard).not.toHaveBeenCalled();
  const player = new Player();
  expect(Gameboard).toHaveBeenCalledTimes(1);
});
