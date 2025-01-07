const settingsBtn = document.getElementById("settings");
const settingsDialog = document.getElementById("settings-dialog");
const applySettingsBtn = document.getElementById("apply-btn");
const cancelSettingsBtn = document.getElementById("cancel-btn");
const playerSizeInput = document.getElementById("player-size");
const stepSizeInput = document.getElementById("step-size");
//
const map = document.getElementById("map");
const player = document.getElementById("player");
//// Settings
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
const maxX = map.offsetWidth - playerSize;
let posX = maxX / 2;
const maxY = map.offsetHeight - playerSize;
let posY = maxY / 2;
let stepSize = 50;
// Move object to clicked coordinates on screen
map.addEventListener("click", (e) => {
  updatePos(e.clientX - playerSize / 2, e.clientY - playerSize / 2);
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
  }
  console.log(`X: ${posX}, Y: ${posY}`);
  updatePos(posX, posY);
}
function updatePos(x, y) {
  posX = x;
  if (posX < 0) posX = 0;
  if (posX > maxX) posX = maxX;

  posY = y;
  if (posY < 0) posY = 0;
  if (posY > maxY) posY = maxY;
  player.style.transform = `translate(${posX}px, ${posY}px)`;
}
