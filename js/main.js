//// Import needed classes
import { Map } from "./map.js";
import { Player } from "./player.js";
import { Settings } from "./settings.js";
import { Obstacle } from "./obstacle.js";
//// Initialize an instance of Settings
const settings = new Settings();
//// Initialize an instance of Map and export it for use in the Obstacle class
// Uses settings as argument to set border size
export const map = new Map(settings);
//// Initialize an instance of Player
// Uses settings and map as arguments
// settings - player and step size
// map - set player to the correct map (in case of multiple maps in the future)
const player = new Player(settings, map);
//// Adds eventlisteners needed to run correctly
settings.init(map, player);
map.init(settings, player);

// Place an obstacle (x axis, y axis, optional size in px)
new Obstacle(720, 381, 130);
new Obstacle(0, 500);
