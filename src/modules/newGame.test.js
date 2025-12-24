/**
 * @jest-environment jsdom
 */

import Gameboard from "./gameboard.js";
import newGame from "./newGame.js";
import Player from "./player.js";
import renderGameboard from "./ui/renderGameboard.js";
import renderMessage from "./ui/renderMessage.js";

jest.mock("./gameboard.js");
const mockGameboard = new Gameboard();
jest.mock("./player.js", () => {
  return jest.fn().mockImplementation(() => {
    return { gameboard: mockGameboard };
  });
});
jest.mock("./ui/renderGameboard.js");
jest.mock("./ui/renderMessage.js");

beforeEach(() => {
  Gameboard.mockClear();
  Player.mockClear();
});

test("newGame function calls Player class", () => {
  expect(Player).not.toHaveBeenCalled();
  newGame();
  expect(Player).toHaveBeenCalledTimes(2);
});

test("newGame function calls placeShip function", () => {
  newGame();
  const player = new Player();
  expect(player.gameboard.placeShip).toHaveBeenCalled();
});

test("newGame function calls renderGameboard and renderMessage functions", () => {
  newGame();
  expect(renderGameboard).toHaveBeenCalled();
  expect(renderMessage).toHaveBeenCalled();
});
