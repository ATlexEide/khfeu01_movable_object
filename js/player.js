export class Player {
  constructor(settings, map) {
    (this.map = map),
      (this.object = document.getElementById("player")),
      (this.playerSize = settings.playerSize),
      (this.stepSize = settings.stepSize),
      (this.position = {
        x: map.border.x / 2 - settings.playerSize,
        y: map.border.y / 2 - settings.playerSize,
      });
    this.object.style.width = `${settings.playerSize}px`;
  }
  updatePos(x, y) {
    this.position.x = x;
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x > this.map.border.x)
      this.position.x = this.map.border.x;

    this.position.y = y;
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y > this.map.border.y)
      this.position.y = this.map.border.y;
    player.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
  }
  resetPos() {
    this.updatePos(
      this.map.object.offsetWidth / 2 - this.playerSize,
      this.map.object.offsetHeight / 2 - this.playerSize
    );
  }
  move(key) {
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
    this.updatePos(this.position.x, this.position.y);
  }
  // Move object to clicked coordinates on screen
}
