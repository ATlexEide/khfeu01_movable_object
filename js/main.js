const settingsBtn = document.getElementById("settings");
const settingsDialog = document.getElementById("settings-dialog");
const applySettingsBtn = document.getElementById("cancel-btn");
const cancelSettingsBtn = document.getElementById("apply-btn");
const map = document.getElementById("map");
const player = document.getElementById("player");
// Settings
settingsBtn.addEventListener("click", () => {
  settingsDialog.showModal();
});
// Player options
let playerSize = 100;
player.style.width = `${playerSize}px`;
// Positioning variables
let posX = 0;
let posY = 0;
let step = 50;
// Move object to clicked coordinates on screen
map.addEventListener("click", (e) => {
  posX = e.clientX - playerSize / 2;
  posY = e.clientY - playerSize / 2;
  console.log(`X: ${posX}, Y: ${posY}`);
  player.style.transform = `translate(${posX}px, ${posY}px)`;
});
//
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      posX += step;
      break;
    case "ArrowUp":
      posY -= step;
      break;
    case "ArrowDown":
      posY += step;

      break;
    case "ArrowLeft":
      posX -= step;
      break;

    default:
      break;
  }
  console.log(`X: ${posX}, Y: ${posY}`);
  player.style.transform = `translate(${posX}px, ${posY}px)`;
});
