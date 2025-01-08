import { Map } from "./map.js";
import { Player } from "./player.js";
import { Settings } from "./settings.js";
const settings = new Settings(100, 50);
const map = new Map(settings);
const player = new Player(settings, map);
settings.init(map, player);
map.init(settings, player);
