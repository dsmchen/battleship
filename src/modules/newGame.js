import Player from "./player.js";
import renderGameboard from "./ui/renderGameboard.js";
import { renderActionMessage, renderTurnMessage } from "./ui/renderMessage.js";

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

  const gameboardContainers = document.querySelectorAll(".gameboard-container");
  if (gameboardContainers.length) {
    gameboardContainers.forEach((container) => {
      container.remove();
    });
  }

  renderGameboard(playerOne, playerTwo);
  renderGameboard(playerTwo, playerOne);
  renderActionMessage("Let the game begin!");
  renderTurnMessage(`${playerOne.name}'s turn...`);
}
