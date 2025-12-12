import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
jest.mock("./ship.js");

beforeEach(() => {
  Ship.mockClear();
});

test("placeShip function calls Ship class constructor", () => {
  expect(Ship).not.toHaveBeenCalled();
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 3);
  expect(Ship).toHaveBeenCalledTimes(1);
});

test("placeShip function places ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 3);
  expect(gameboard.grid[0][0]).toBeInstanceOf(Ship);
  expect(gameboard.grid[0][1]).toBeInstanceOf(Ship);
  expect(gameboard.grid[0][2]).toBeInstanceOf(Ship);
});

test("receiveAttack function calls Ship class hit function", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 3);
  gameboard.receiveAttack(0, 0);

  const mockShipInstance = Ship.mock.instances[0];
  const mockHit = mockShipInstance.hit;
  expect(mockHit).toHaveBeenCalledTimes(1);
});

test("receiveAttack function records missed attacks", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 3);
  gameboard.receiveAttack(1, 1);
  expect(gameboard.missedAttacks).toStrictEqual([[1, 1]]);
});
