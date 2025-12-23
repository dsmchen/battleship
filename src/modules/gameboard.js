import Ship from "./ship.js";
import renderMessage from "./ui/renderMessage.js";

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
    this.hasAllSunk = false;
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
      return true;
    } else {
      this.missedAttacks.push([x, y]);
      renderMessage("Miss!");
      return false;
    }
  }

  isAllSunk(arr = this.grid) {
    let shipInstance = 0;
    let shipHasSunk = 0;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        const el = arr[i][j];
        if (el instanceof Ship) {
          shipInstance++;
          if (el.hasSunk) {
            shipHasSunk++;
          } else {
            this.hasAllSunk = false;
          }
        }
      }
    }

    if (shipInstance === shipHasSunk) this.hasAllSunk = true;
  }
}
