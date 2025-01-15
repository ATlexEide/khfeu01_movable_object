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
new Obstacle(720, 381, 130);
new Obstacle(0, 500);
