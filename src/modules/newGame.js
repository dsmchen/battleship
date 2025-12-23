import Player from "./player.js";
import renderGameboard from "./ui/renderGameboard.js";
import renderMessage from "./ui/renderMessage.js";

export default function newGame() {
  const playerOne = new Player("Player 1");
  const playerTwo = new Player("Player 2");

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
  renderMessage("action", "Let the game begin!");
  renderMessage("turn", `${playerOne.name}'s turn...`);
}
