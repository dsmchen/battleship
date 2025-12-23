import renderMessage from "./ui/renderMessage.js";

export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.hasSunk = false;
  }

  hit() {
    this.hits++;
    renderMessage("Hit!");
    this.isSunk();
  }

  isSunk() {
    this.hasSunk = this.length === this.hits;
    if (this.hasSunk) {
      renderMessage("This ship has sunk!");
    }
  }
}
