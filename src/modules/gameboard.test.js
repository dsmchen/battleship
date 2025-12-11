import Gameboard from "./gameboard.js";

test("placeShip function places ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 3);
  const ship = { hasSunk: false, hits: 0, length: 3 };
  expect(gameboard.grid[0][0]).toEqual(ship);
  expect(gameboard.grid[0][1]).toEqual(ship);
  expect(gameboard.grid[0][2]).toEqual(ship);
});
