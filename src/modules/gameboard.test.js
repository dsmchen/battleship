import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import renderMessage from "./ui/renderMessage.js";
jest.mock("./ship.js");
jest.mock("./ui/renderMessage.js");

beforeEach(() => {
  Ship.mockClear();
});

test("placeShip function calls Ship class", () => {
  expect(Ship).not.toHaveBeenCalled();
  const gameboard = new Gameboard();
  gameboard.placeShip(3);
  expect(Ship).toHaveBeenCalledTimes(1);
});

test("placeShip function places horizontal ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, 0, 0, "horizontal");
  expect(gameboard.grid[0][0]).toBeInstanceOf(Ship);
  expect(gameboard.grid[0][1]).toBeInstanceOf(Ship);
  expect(gameboard.grid[0][2]).toBeInstanceOf(Ship);
});

test("placeShip function places vertical ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, 0, 0, "vertical");
  expect(gameboard.grid[0][0]).toBeInstanceOf(Ship);
  expect(gameboard.grid[1][0]).toBeInstanceOf(Ship);
  expect(gameboard.grid[2][0]).toBeInstanceOf(Ship);
});

test("random orientation is horizontal for number < 5", () => {
  const gameboard = new Gameboard();
  expect(gameboard.randomOrientation(0)).toBe("horizontal");
});

test("random orientation is vertical for number > 5", () => {
  const gameboard = new Gameboard();
  expect(gameboard.randomOrientation(9)).toBe("vertical");
});

test("checkValidity function returns true for valid input", () => {
  const gameboard = new Gameboard();
  expect(gameboard.checkValidity(5, 0, 0, "horizontal")).toBe(true);
});

test("checkValidity function returns false for invalid input", () => {
  const gameboard = new Gameboard();
  expect(gameboard.checkValidity(5, 9, 9, "vertical")).toBe(false);
});

test("receiveAttack function calls Ship class hit function", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, 0, 0);
  gameboard.receiveAttack(0, 0);

  const mockShipInstance = Ship.mock.instances[0];
  const mockHit = mockShipInstance.hit;
  expect(mockHit).toHaveBeenCalledTimes(1);
});

test("receiveAttack function records missed attacks", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, 0, 0);
  gameboard.receiveAttack(1, 1);
  expect(gameboard.missedAttacks).toStrictEqual([[1, 1]]);
  expect(renderMessage).toHaveBeenCalledTimes(1);
});

test("isAllSunk function toggles hasAllSunk variable to be true", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, 0, 0, "horizontal");
  gameboard.placeShip(2, 1, 1, "horizontal");
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(0, 2);
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(1, 2);

  const a = Ship.mock.instances[0];
  const b = Ship.mock.instances[1];
  a.hasSunk = true;
  b.hasSunk = true;

  gameboard.isAllSunk();
  expect(gameboard.hasAllSunk).toBe(true);
});

test("isAllSunk function toggles hasAllSunk variable to be false", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(3, 0, 0, "horizontal");
  gameboard.placeShip(2, 1, 1, "horizontal");
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(0, 2);

  const a = Ship.mock.instances[0];
  const b = Ship.mock.instances[1];
  a.hasSunk = true;
  b.hasSunk = false;

  gameboard.isAllSunk();
  expect(gameboard.hasAllSunk).toBe(false);
});
