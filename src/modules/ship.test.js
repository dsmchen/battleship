import Ship from "./ship.js";

test("hit function adds 1 to hits variable", () => {
  const ship = new Ship();
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("isSunk function calculates hasSunk variable", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.isSunk();
  expect(ship.hasSunk).toBe(true);
});
