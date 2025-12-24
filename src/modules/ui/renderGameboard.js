import { randomNumber } from "../lib.js";
import Ship from "../ship.js";
import renderMessage from "./renderMessage.js";

export default function renderGameboard(player, enemy) {
  const playerName = player.name;
  const playerGrid = player.gameboard.grid;
  const container = document.querySelector(".container");
  const gameboardContainer = document.createElement("div");
  const shipContainer = document.createElement("div");
  const shipTitle = document.createElement("h2");
  const shipGrid = document.createElement("div");
  const attackContainer = document.createElement("div");
  const attackTitle = document.createElement("h2");
  const attackGrid = document.createElement("div");

  gameboardContainer.classList.add("gameboard-container");
  shipContainer.classList.add("ship-container");
  shipTitle.classList.add("ship-title");
  shipGrid.classList.add("ship-grid");
  attackContainer.classList.add("attack-container");
  attackTitle.classList.add("attack-title");
  attackGrid.classList.add("attack-grid");

  if (player.name === "Computer") {
    gameboardContainer.classList.add("hidden");
  }

  shipTitle.textContent = `${playerName}'s Ships`;
  attackTitle.textContent = `${playerName}'s Attacks`;

  for (let i = 0; i < playerGrid.length; i++) {
    for (let j = 0; j < playerGrid[i].length; j++) {
      const el = playerGrid[i][j];
      if (el instanceof Ship) {
        const ship = document.createElement("div");
        ship.classList.add("ship");
        ship.dataset.x = i;
        ship.dataset.y = j;
        shipGrid.appendChild(ship);
      } else {
        const sea = document.createElement("div");
        sea.classList.add("sea");
        sea.dataset.x = i;
        sea.dataset.y = j;
        shipGrid.appendChild(sea);
      }
    }
  }

  for (let k = 0; k < 100; k++) {
    const sea = document.createElement("div");
    sea.classList.add("sea");
    sea.addEventListener("click", function () {
      handleAttack(this, player, enemy);
    });

    if (k < 10) {
      sea.dataset.x = 0;
      sea.dataset.y = k;
    } else {
      sea.dataset.x = k.toString().split("")[0];
      sea.dataset.y = k.toString().split("")[1];
    }

    attackGrid.appendChild(sea);
  }

  shipContainer.append(shipTitle, shipGrid);
  attackContainer.append(attackTitle, attackGrid);
  gameboardContainer.append(shipContainer, attackContainer);
  container.appendChild(gameboardContainer);
}

function handleAttack(t, player, enemy) {
  if (t.classList.contains("hit") || t.classList.contains("miss")) {
    return renderMessage("action", "Already attacked!");
  }

  const x = t.dataset.x;
  const y = t.dataset.y;
  let target;
  const isSuccess = enemy.gameboard.receiveAttack(x, y);

  for (const container of document.querySelectorAll(".ship-container")) {
    const thisShipContainer = t.parentElement.parentElement.previousSibling;

    if (container !== thisShipContainer) {
      const enemyShipContainer = container;
      target = enemyShipContainer.querySelector(
        `[data-x='${x}'][data-y='${y}']`,
      );
    }
  }

  if (isSuccess) {
    t.classList.add("hit");
    target.classList.add("hit");
    if (enemy.gameboard.isAllSunk()) {
      return endGame(player);
    }
  } else {
    t.classList.add("miss");
    target.classList.add("miss");
  }

  nextTurn(t, enemy);
}

function nextTurn(t, enemy) {
  const thisAttackGrid = t.parentElement;
  let enemyAttackGrid;

  thisAttackGrid.classList.add("block");

  for (const grid of document.querySelectorAll(".attack-grid")) {
    if (grid !== thisAttackGrid) {
      enemyAttackGrid = grid;
      enemyAttackGrid.classList.remove("block");
    }
  }

  renderMessage("turn", `${enemy.name}'s turn...`);

  if (enemy.name === "Computer") {
    computerTurn(enemyAttackGrid);
  }
}

function computerTurn(attackGrid) {
  const x = randomNumber();
  const y = randomNumber();
  const target = attackGrid.querySelector(`[data-x='${x}'][data-y='${y}']`);

  if (target.classList.contains("hit") || target.classList.contains("miss")) {
    computerTurn(attackGrid);
  } else {
    setTimeout(() => {
      target.click();
    }, 2000);
  }
}

function endGame(player) {
  const attackGrids = document.querySelectorAll(".attack-grid");

  attackGrids.forEach((grid) => {
    grid.classList.add("block");
  });

  renderMessage("action", "Game over!");
  renderMessage("turn", `${player.name} is the winner!`);
}
