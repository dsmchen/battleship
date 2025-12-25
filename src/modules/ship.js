export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.hasSunk = false;
  }

  hit() {
    this.hits++;
    this.isSunk();
    return this.hasSunk ? "sunk" : "hit";
  }

  isSunk() {
    this.hasSunk = this.length === this.hits;
  }
}
