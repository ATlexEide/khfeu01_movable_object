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
const maxX = map.offsetWidth - playerSize;
let posY = 0;
const maxY = map.offsetHeight - playerSize;
let stepSize = 50;
// Move object to clicked coordinates on screen
map.addEventListener("click", (e) => {
  moveTo(e.clientX, e.clientY);
});
//
document.addEventListener("keydown", (e) => {
  move(e.key);
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

function move(key) {
  switch (key) {
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
}
function moveTo(x, y) {
  posX = x - playerSize / 2;
  if (posX < 0) posX = 0;
  if (posX > maxX) posX = maxX;

  posY = y - playerSize / 2;
  if (posY < 0) posY = 0;
  if (posY > maxY) posY = maxY;

  console.log(`X: ${posX}, Y: ${posY}`);
  console.log("max X: ", maxX);
  console.log("max Y: ", maxY);
  player.style.transform = `translate(${posX}px, ${posY}px)`;
}
