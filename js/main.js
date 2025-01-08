import { Map } from "./map.js";
import { Player } from "./player.js";
import { Settings } from "./settings.js";
const settings = new Settings(100, 50);
const map = new Map(settings);
const player = new Player(settings, map);
console.log(settings);
//// Settings
settings.init();
// Player options
settings.changePlayerSize(player, 100);

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

function updateBorder() {
  properties.map.border.x =
    properties.map.object.offsetWidth - properties.player.playerSize;
  properties.map.border.y =
    properties.map.object.offsetHeight - properties.player.playerSize;
}
properties.init();
