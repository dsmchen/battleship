import newGame from "./modules/newGame.js";
import renderGameboard from "./modules/ui/renderGameboard.js";
import {
  renderActionMessage,
  renderTurnMessage,
} from "./modules/ui/renderMessage.js";
import "./style.css";

window.addEventListener("load", () => {
  initGame();
});

export default function initGame() {
  const players = newGame();
  const playerOne = players[0];
  const playerTwo = players[1];

  renderGameboard(playerOne, playerTwo);
  renderGameboard(playerTwo, playerOne);
  renderActionMessage("Let the game begin!");
  renderTurnMessage(`${playerOne.name}'s turn...`);
}
