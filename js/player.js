export class Player {
  constructor(settings, map) {
    (this.object = document.getElementById("player")),
      (this.playerSize = settings.playerSize),
      (this.stepSize = settings.stepSize),
      (this.position = {
        x: map.border.x / 2 - settings.playerSize,
        y: map.border.y / 2 - settings.playerSize,
      });
  }
  updatePos(x, y, map) {
    this.position.x = x;
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x > map.border.x) this.position.x = map.border.x;

    this.position.y = y;
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y > map.border.y) this.position.y = map.border.y;
    player.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
  }
  resetPos() {
    this.position.x = map.object.offsetWidth / 2 - this.playerSize;
    this.position.y = map.object.offsetHeight / 2 - this.playerSize;
  }
  move(key, map) {
    switch (key) {
      case "ArrowRight":
        this.position.x += this.stepSize;
        break;
      case "ArrowUp":
        this.position.y -= this.stepSize;
        break;
      case "ArrowDown":
        this.position.y += this.stepSize;
        break;
      case "ArrowLeft":
        this.position.x -= this.stepSize;
        break;
    }
    console.log(`X: ${this.position.x}, Y: ${this.position.y}`);
    this.updatePos(this.position.x, this.position.y, map);
  }
  // Move object to clicked coordinates on screen
}