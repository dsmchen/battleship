import Player from "./player.js";
import renderGameboard from "./ui/renderGameboard.js";
import renderMessage from "./ui/renderMessage.js";

export default function newGame() {
  const playerOne = new Player("One");
  const playerTwo = new Player("Two");

  playerOne.gameboard.placeShip(0, 0, 5);
  playerOne.gameboard.placeShip(1, 1, 4);
  playerOne.gameboard.placeShip(2, 2, 3);
  playerOne.gameboard.placeShip(3, 3, 3);
  playerOne.gameboard.placeShip(4, 4, 2);

  playerTwo.gameboard.placeShip(0, 0, 2);
  playerTwo.gameboard.placeShip(1, 1, 3);
  playerTwo.gameboard.placeShip(2, 2, 3);
  playerTwo.gameboard.placeShip(3, 3, 4);
  playerTwo.gameboard.placeShip(4, 4, 5);

  renderGameboard(playerOne, playerTwo);
  renderGameboard(playerTwo, playerOne);
  renderMessage("Let the game begin!");
}
