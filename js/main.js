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
new Obstacle(200, 200, 100).place();
new Obstacle(600, 200).place();
new Obstacle(420, 451, 300).place();
new Obstacle(1020, 51, 130).place();
new Obstacle(1020, 511, 130).place();
