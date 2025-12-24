import { randomNumber } from "./lib.js";
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

  placeShip(
    length,
    x = randomNumber(),
    y = randomNumber(),
    orientation = this.randomOrientation(),
  ) {
    const isValid = this.checkValidity(length, x, y, orientation);

    if (isValid) {
      const ship = new Ship(length);
      this.grid[x][y] = ship;

      for (let i = 0; i < length; i++) {
        if (orientation === "horizontal") {
          this.grid[x][y++] = ship;
        } else if (orientation === "vertical") {
          this.grid[x++][y] = ship;
        }
      }
    } else {
      this.placeShip(length);
    }
  }

  randomOrientation() {
    const number = randomNumber();
    if (number < 5) {
      return "horizontal";
    } else {
      return "vertical";
    }
  }

  checkValidity(length, x, y, orientation) {
    const maxX = x + length;
    const maxY = y + length;

    if (maxX > 9 || maxY > 9) return false;

    if (this.grid[x][y] !== 0) return false;

    for (let i = 0; i < length; i++) {
      if (orientation === "horizontal") {
        if (this.grid[x][y++] !== 0) return false;
      } else if (orientation === "vertical") {
        if (this.grid[x++][y] !== 0) return false;
      }
    }

    return true;
  }

  receiveAttack(x, y) {
    if (this.grid[x][y] !== 0) {
      const ship = this.grid[x][y];
      ship.hit();
      return true;
    } else {
      this.missedAttacks.push([x, y]);
      renderMessage("action", "Miss!");
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

    return this.hasAllSunk;
  }
}
