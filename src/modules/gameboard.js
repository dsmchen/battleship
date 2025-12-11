import Ship from "./ship.js";

export default class Gameboard {
  constructor() {
    this.grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.missedAttacks = [];
  }

  placeShip(x, y, length) {
    const ship = new Ship(length);
    this.grid[x][y] = ship;
    for (let i = 0; i < length; i++) {
      this.grid[x][y++] = ship;
    }
  }

  receiveAttack(x, y) {
    if (this.grid[x][y] !== 0) {
      const ship = this.grid[x][y];
      ship.hit();
    } else {
      this.missedAttacks.push([x, y]);
    }
  }
}
