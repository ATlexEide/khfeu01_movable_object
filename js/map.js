export class Map {
  constructor(settings) {
    (this.object = document.getElementById("map")),
      (this.border = {
        x: document.getElementById("map").offsetWidth - settings.playerSize,
        y: document.getElementById("map").offsetHeight - settings.playerSize,
      });
  }
}
