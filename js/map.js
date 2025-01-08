export class Map {
  isMouseClicking = false;
  constructor(settings) {
    (this.object = document.getElementById("map")),
      (this.border = {
        x: document.getElementById("map").offsetWidth - settings.playerSize,
        y: document.getElementById("map").offsetHeight - settings.playerSize,
      });
  }
  updateBorder(settings) {
    this.border.x = this.object.offsetWidth - settings.playerSize / 2;
    this.border.y = this.object.offsetHeight - settings.playerSize / 2;
  }
  init = (settings, player) => {
    this.object.addEventListener("mousemove", (e) => {
      if (this.isMouseClicking)
        player.updatePos(
          e.clientX - settings.playerSize / 2,
          e.clientY - settings.playerSize / 2,
          this
        );
    });
    this.object.addEventListener("mousedown", (e) => {
      player.updatePos(
        e.clientX - settings.playerSize / 2,
        e.clientY - settings.playerSize / 2,
        this
      );
      console.log(this.isMouseClicking);
      this.isMouseClicking = true;
    });
    this.object.addEventListener("mouseup", () => {
      this.isMouseClicking = false;
    });
    //
    document.addEventListener("keydown", (e) => {
      player.move(e.key, this);
    });
  };
}