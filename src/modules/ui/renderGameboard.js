import Ship from "../ship.js";

export default function renderGameboard(player, enemy) {
  const playerName = player.name;
  const playerGrid = player.gameboard.grid;
  const container = document.querySelector(".container");
  const gameboardContainer = document.createElement("div");
  const shipTitle = document.createElement("h2");
  const shipContainer = document.createElement("div");
  const attackTitle = document.createElement("h2");
  const attackContainer = document.createElement("div");

  gameboardContainer.classList.add("gameboard-container");
  shipTitle.classList.add("ship-title");
  shipContainer.classList.add("ship-container");
  attackTitle.classList.add("attack-title");
  attackContainer.classList.add("attack-container");

  shipTitle.textContent = `${playerName}'s Ships`;
  attackTitle.textContent = `${playerName}'s Attacks`;

  for (let i = 0; i < playerGrid.length; i++) {
    for (let j = 0; j < playerGrid[i].length; j++) {
      const el = playerGrid[i][j];
      if (el instanceof Ship) {
        const ship = document.createElement("div");
        ship.classList.add("ship");
        shipContainer.appendChild(ship);
      } else {
        const sea = document.createElement("div");
        sea.classList.add("sea");
        shipContainer.appendChild(sea);
      }
    }
  }

  for (let k = 0; k < 100; k++) {
    const sea = document.createElement("div");
    sea.classList.add("sea");
    sea.addEventListener("click", function () {
      handleAttack(this, enemy);
    });

    if (k < 10) {
      sea.dataset.x = 0;
      sea.dataset.y = k;
    } else {
      sea.dataset.x = k.toString().split("")[0];
      sea.dataset.y = k.toString().split("")[1];
    }

    attackContainer.appendChild(sea);
  }

  gameboardContainer.append(
    shipTitle,
    shipContainer,
    attackTitle,
    attackContainer,
  );
  container.appendChild(gameboardContainer);
}

function handleAttack(t, enemy) {
  const x = t.dataset.x;
  const y = t.dataset.y;
  const isSuccess = enemy.gameboard.receiveAttack(x, y);

  if (isSuccess) {
    t.classList.add("hit");
  } else {
    t.classList.add("miss");
  }
}
