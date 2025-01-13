import { Map } from "./map.js";
import { Player } from "./player.js";
import { Settings } from "./settings.js";
import { Obstacle } from "./obstacle.js";
const settings = new Settings(76, 50);
export const map = new Map(settings);
const player = new Player(settings, map);
settings.init(map, player);
map.init(settings, player);
// Place an obstacle (x axis, y axis, optional size in px)

// new Obstacle(420, 451, 300);
// size must be 100 or more
new Obstacle(720, 381, 130);
new Obstacle(1020, 511, 130);
new Obstacle(0, 500, 100);

console.log("player size", player.playerSize);
console.log("player size | settings", settings.playerSize);
