import Ship from "../ship.js";

export default function renderGameboard(grid) {
  const container = document.querySelector(".container");
  const gameboardContainer = document.createElement("div");
  gameboardContainer.classList.add("gameboard-container");

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const el = grid[i][j];
      if (el instanceof Ship) {
        const ship = document.createElement("div");
        ship.classList.add("ship");
        gameboardContainer.appendChild(ship);
      } else {
        const sea = document.createElement("div");
        sea.classList.add("sea");
        gameboardContainer.appendChild(sea);
      }
    }
  }

  container.appendChild(gameboardContainer);
}
