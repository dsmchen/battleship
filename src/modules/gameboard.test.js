import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
jest.mock("./ship.js");

let gameboard;

beforeEach(() => {
  Ship.mockClear();
  gameboard = new Gameboard();
});

describe("placeShip function", () => {
  test("placeShip function calls Ship class constructor", () => {
    expect(Ship).not.toHaveBeenCalled();
    gameboard.placeShip(3);
    expect(Ship).toHaveBeenCalledTimes(1);
  });

  test("placeShip function places horizontal ship", () => {
    gameboard.placeShip(3, 0, 0, "horizontal");
    expect(gameboard.grid[0][0]).toBeInstanceOf(Ship);
    expect(gameboard.grid[0][1]).toBeInstanceOf(Ship);
    expect(gameboard.grid[0][2]).toBeInstanceOf(Ship);
  });

  test("placeShip function places vertical ship", () => {
    gameboard.placeShip(3, 0, 0, "vertical");
    expect(gameboard.grid[0][0]).toBeInstanceOf(Ship);
    expect(gameboard.grid[1][0]).toBeInstanceOf(Ship);
    expect(gameboard.grid[2][0]).toBeInstanceOf(Ship);
  });
});

describe("randomOrientation function", () => {
  test("random orientation is horizontal for number < 5", () => {
    expect(gameboard.randomOrientation(0)).toBe("horizontal");
  });

  test("random orientation is vertical for number > 5", () => {
    expect(gameboard.randomOrientation(9)).toBe("vertical");
  });
});

describe("checkValidity function", () => {
  test("checkValidity function returns true for valid input", () => {
    expect(gameboard.checkValidity(5, 0, 0, "horizontal")).toBe(true);
  });

  test("checkValidity function returns false for invalid input", () => {
    expect(gameboard.checkValidity(5, 9, 9, "vertical")).toBe(false);
  });
});

describe("receiveAttack function", () => {
  test("receiveAttack function calls Ship class hit function", () => {
    gameboard.placeShip(3, 0, 0);
    gameboard.receiveAttack(0, 0);

    const mockShipInstance = Ship.mock.instances[0];
    const mockHit = mockShipInstance.hit;
    expect(mockHit).toHaveBeenCalledTimes(1);
  });

  test("receiveAttack function records missed attacks", () => {
    gameboard.placeShip(3, 0, 0);
    gameboard.receiveAttack(1, 1);
    expect(gameboard.missedAttacks).toStrictEqual([[1, 1]]);
  });
});

describe("isAllSunk function", () => {
  test("isAllSunk function toggles hasAllSunk variable to be true", () => {
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
});
