export class Player {
  constructor(settings, map) {
    this.map = map;
    this.settings = settings;
    this.object = document.getElementById("player");
    this.playerSize = settings.playerSize;
    this.stepSize = settings.stepSize;
    this.position = {
      x: this.map.border.x / 2,
      y: this.map.border.y / 2,
      previous: { x: this.map.border.x / 2, y: this.map.border.y / 2 },
    };
    this.origin = document.getElementById("origin");
    this.middle = {
      x: this.position.x + this.playerSize / 2,
      y: this.position.y + this.playerSize / 2,
    };
    this.object.style.width = `${settings.playerSize}px`;
  }
  updatePos(x, y, side) {
    if (this.settings.deletingObstacle) return;
    this.position.previous.x = this.position.x;
    this.position.previous.y = this.position.y;
    this.position.x = x;
    this.position.y = y;
    this.middle.x = x + this.playerSize / 2;
    this.middle.y = y + this.playerSize / 2;
    this.borderCollisionCheck(x, y);
    this.obstacleCollisionCheck(side);
    player.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    this.origin.style.transform = `translate(${this.middle.x}px, ${this.middle.y}px)`;
  }
  resetPos() {
    this.updatePos(
      this.map.object.offsetWidth / 2 - this.playerSize,
      this.map.object.offsetHeight / 2 - this.playerSize
    );
  }
  move(key) {
    if (this.settings.settingsDialog.open) return;
    switch (key) {
      case "d":
      case "ArrowRight":
        this.updatePos(
          this.position.x + this.settings.stepSize,
          this.position.y,
          "left"
        );
        break;
      case "w":
      case "ArrowUp":
        this.updatePos(
          this.position.x,
          this.position.y - this.settings.stepSize,
          "bottom"
        );
        break;
      case "s":
      case "ArrowDown":
        this.updatePos(
          this.position.x,
          this.position.y + this.settings.stepSize,
          "top"
        );
        break;
      case "a":
      case "ArrowLeft":
        this.updatePos(
          this.position.x - this.settings.stepSize,
          this.position.y,
          "right"
        );
        break;
    }
  }
  borderCollisionCheck(x, y) {
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x > this.map.border.x) {
      this.position.x = this.map.border.x;
    }

    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y > this.map.border.y)
      this.position.y = this.map.border.y;
  }
  obstacleCollisionCheck(side) {
    this.map.obstacles.forEach((obstacle) => {
      // Player coordinates
      const y = this.position.y;
      const yy = this.position.y + this.playerSize;
      const x = this.position.x;
      const xx = this.position.x + this.playerSize;
      // Check coordinate overlapping with player and obstacle
      const right = obstacle.x[0] < x && x < obstacle.x[1];
      const left = obstacle.x[0] < xx && xx < obstacle.x[1];
      const bottom = obstacle.y[0] < y && y < obstacle.y[1];
      const top = obstacle.y[0] < yy && yy < obstacle.y[1];
      const bigX = x <= obstacle.x[0] && xx > obstacle.x[1];
      const bigY = y <= obstacle.y[0] && yy > obstacle.y[1];

      if (
        (bigX && top) ||
        (bigX && bottom) ||
        (bigY && left) ||
        (bigY && right) ||
        (top && left) ||
        (top && right) ||
        (bottom && left) ||
        (bottom && right)
      )
        switch (side) {
          case "top":
            this.updatePos(this.position.x, obstacle.y[0] - this.playerSize);
            break;
          case "bottom":
            this.updatePos(this.position.x, obstacle.y[1]);
            break;
          case "right":
            this.updatePos(obstacle.x[1], this.position.y);
            break;
          case "left":
            this.updatePos(obstacle.x[0] - this.playerSize, this.position.y);
            break;

          default:
            break;
        }
      if (this.phasing(obstacle)) {
        this.position.x = this.position.previous.x;
        this.position.y = this.position.previous.y;
      }
    });
  }

  phasing(obstacle) {
    const right = this.middle.x + this.playerSize / 2;
    const left = this.middle.x - this.playerSize / 2;
    const top = this.middle.y - this.playerSize / 2;
    const bottom = this.middle.y + this.playerSize / 2;
    const obstacleLeft = obstacle.x[0];
    const obstacleRight = obstacle.x[1];
    const obstacleTop = obstacle.y[0];
    const obstacleBottom = obstacle.y[1];
    if (
      right > obstacleLeft &&
      left < obstacleRight &&
      bottom > obstacleTop &&
      top < obstacleBottom
    ) {
      return true;
    } else return false;
  }
}
