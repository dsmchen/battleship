import Ship from "./ship.js";
import { renderActionMessage } from "./ui/renderMessage.js";
jest.mock("./ui/renderMessage.js");

describe("hit function", () => {
  test("hit function adds 1 to hits variable", () => {
    const ship = new Ship();
    ship.hit();
    expect(ship.hits).toBe(1);
    expect(renderActionMessage).toHaveBeenCalledTimes(1);
  });
});

describe("isSunk function", () => {
  test("isSunk function calculates hasSunk variable to be true", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.isSunk();
    expect(ship.hasSunk).toBe(true);
  });

  test("isSunk function calculates hasSunk variable to be false", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.isSunk();
    expect(ship.hasSunk).toBe(false);
  });
});
