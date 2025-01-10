import { Map } from "./map.js";
import { Player } from "./player.js";
import { Settings } from "./settings.js";
import { Obstacle } from "./obstacle.js";
const settings = new Settings(100, 50);
export const map = new Map(settings);
const player = new Player(settings, map);
settings.init(map, player);
map.init(settings, player);
// Place an obstacle (x axis, y axis, optional size in px)

new Obstacle(420, 451, 300);
new Obstacle(720, 481, 130);
new Obstacle(1020, 511, 130);
new Obstacle(0, 0, 200);
