import Gameboard from "./gameboard.js";

test("placeShip function places ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 3);
  const ship = { hasSunk: false, hits: 0, length: 3 };
  expect(gameboard.grid[0][0]).toEqual(ship);
  expect(gameboard.grid[0][1]).toEqual(ship);
  expect(gameboard.grid[0][2]).toEqual(ship);
});

test("receiveAttack function receives attack", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 3);
  gameboard.receiveAttack(0, 0);
  const ship = { hasSunk: false, hits: 1, length: 3 };
  expect(ship.hits).toBe(1);
});

test("receiveAttack function records missed attacks", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 3);
  gameboard.receiveAttack(1, 1);
  expect(gameboard.missedAttacks).toStrictEqual([[1, 1]]);
});
