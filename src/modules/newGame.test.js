import Gameboard from "./gameboard.js";
import newGame from "./newGame.js";
import Player from "./player.js";

jest.mock("./gameboard.js");
const mockGameboard = new Gameboard();
jest.mock("./player.js", () => {
  return jest.fn().mockImplementation(() => {
    return { gameboard: mockGameboard };
  });
});

beforeEach(() => {
  Gameboard.mockClear();
  Player.mockClear();
});

describe("newGame function", () => {
  test("newGame function calls Player class constructor", () => {
    expect(Player).not.toHaveBeenCalled();
    newGame();
    expect(Player).toHaveBeenCalledTimes(2);
  });

  test("newGame function calls placeShip function", () => {
    newGame();
    const player = new Player();
    expect(player.gameboard.placeShip).toHaveBeenCalled();
  });
});
