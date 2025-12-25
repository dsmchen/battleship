import Player from "./player.js";

export default function newGame() {
  const playerOne = new Player("Human");
  const playerTwo = new Player("Computer");

  playerOne.gameboard.placeShip(2);
  playerOne.gameboard.placeShip(3);
  playerOne.gameboard.placeShip(3);
  playerOne.gameboard.placeShip(4);
  playerOne.gameboard.placeShip(5);

  playerTwo.gameboard.placeShip(2);
  playerTwo.gameboard.placeShip(3);
  playerTwo.gameboard.placeShip(3);
  playerTwo.gameboard.placeShip(4);
  playerTwo.gameboard.placeShip(5);

  return [playerOne, playerTwo];
}
