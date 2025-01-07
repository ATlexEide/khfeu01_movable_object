const settingsBtn = document.getElementById("settings");
const settingsDialog = document.getElementById("settings-dialog");
const applySettingsBtn = document.getElementById("apply-btn");
const cancelSettingsBtn = document.getElementById("cancel-btn");
const playerSizeInput = document.getElementById("player-size");
const stepSizeInput = document.getElementById("step-size");
//
const map = document.getElementById("map");
const player = document.getElementById("player");
// Settings
// Open settings dialog
settingsBtn.addEventListener("click", () => {
  settingsDialog.showModal();
});
// Cancel settings and close dialog
cancelSettingsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("yippie");
  settingsDialog.close();
});
// Apply settings
applySettingsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("player size: ", playerSizeInput.value);
  console.log("step size: ", stepSizeInput.value);
  console.log("yippie");
  changePlayerSize(playerSizeInput.value);
  changeStepSize(stepSizeInput.value);
  settingsDialog.close();
});
// Player options
let playerSize = 100;
changePlayerSize(playerSize);
// Positioning variables
let posX = 0;
let posY = 0;
let stepSize = 50;
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
      posX += stepSize;
      console.log(stepSize);
      console.log(posX);
      break;
    case "ArrowUp":
      posY -= stepSize;
      break;
    case "ArrowDown":
      posY += stepSize;

      break;
    case "ArrowLeft":
      posX -= stepSize;
      break;

    default:
      break;
  }
  console.log(`X: ${posX}, Y: ${posY}`);
  player.style.transform = `translate(${posX}px, ${posY}px)`;
});

function changePlayerSize(size) {
  playerSize = size;
  player.style.width = `${playerSize}px`;
}
function changeStepSize(size) {
  console.log("new stepSize: ", size);
  stepSize = Number(size);
  console.log(stepSize);
}
