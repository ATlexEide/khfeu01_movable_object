import { Map } from "./map.js";
import { Player } from "./player.js";
import { Settings } from "./settings.js";
// Settings dialog variables
const settings = new Settings(100, 50);
const map = new Map(settings);
const player = new Player(settings, map);
console.log(settings);
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
  updateBorder();
  settingsDialog.close();
});
// Player options
changePlayerSize(properties.player.playerSize);

// Move object to clicked coordinates on screen
let isMouseClicking = false;
map.addEventListener("mousemove", (e) => {
  if (isMouseClicking)
    updatePos(
      e.clientX - properties.player.playerSize / 2,
      e.clientY - properties.player.playerSize / 2
    );
});
map.addEventListener("mousedown", (e) => {
  updatePos(
    e.clientX - properties.player.playerSize / 2,
    e.clientY - properties.player.playerSize / 2
  );
  console.log(isMouseClicking);
  isMouseClicking = true;
});
map.addEventListener("mouseup", () => {
  isMouseClicking = false;
});
//
document.addEventListener("keydown", (e) => {
  move(e.key);
});

function changePlayerSize(size) {
  properties.player.playerSize = size;
  properties.player.object.style.width = `${properties.player.playerSize}px`;
}
function changeStepSize(size) {
  console.log("new stepSize: ", size);
  properties.player.stepSize = Number(size);
  console.log(properties.player.stepSize);
}

function updateBorder() {
  properties.map.border.x =
    properties.map.object.offsetWidth - properties.player.playerSize;
  properties.map.border.y =
    properties.map.object.offsetHeight - properties.player.playerSize;
}
properties.init();
