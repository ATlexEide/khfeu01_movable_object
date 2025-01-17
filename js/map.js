import { Obstacle } from "./obstacle.js";
export class Map {
  isMouseClicking = false;
  obstacles = Obstacle.usedSpace;
  constructor(settings) {
    this.object = document.getElementById("map");
    this.border = {
      x: document.getElementById("map").offsetWidth - settings.playerSize,
      y: document.getElementById("map").offsetHeight - settings.playerSize,
    };
  }
  updateBorder(settings) {
    this.border.x = this.object.offsetWidth - settings.playerSize;
    this.border.y = this.object.offsetHeight - settings.playerSize;
  }
  init = (settings, player) => {
    this.object.addEventListener("mousemove", (e) => {
      if (settings.previewActive) return;
      if (this.isMouseClicking) {
        player.object.style.transition = "0s";
        // player.origin.style.transition = "10s";
        player.updatePos(
          e.clientX - settings.playerSize / 2,
          e.clientY - settings.playerSize / 2,
          this
        );
      }
    });
    this.object.addEventListener("mousedown", (e) => {
      if (!settings.previewActive) {
        player.object.style.transition = "0.3s";

        player.updatePos(
          e.clientX - settings.playerSize / 2,
          e.clientY - settings.playerSize / 2,
          this
        );
        this.isMouseClicking = true;
      }
    });
    this.object.addEventListener("mouseup", () => {
      this.isMouseClicking = false;
    });
    //
    document.addEventListener("keydown", (e) => {
      player.object.style.transition = "0.3s";

      player.move(e.key);
    });
  };
}
