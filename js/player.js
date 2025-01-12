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
  updatePos(x, y) {
    this.position.previous.x = this.position.x;
    this.position.previous.y = this.position.y;
    this.position.x = x;
    this.position.y = y;
    this.middle.x = x + this.playerSize / 2;
    this.middle.y = y + this.playerSize / 2;
    this.borderCollisionCheck(x, y);
    this.obstacleCollisionCheck(x, y);
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
    switch (key) {
      case "ArrowRight":
        this.updatePos(
          this.position.x + this.settings.stepSize,
          this.position.y
        );
        break;
      case "ArrowUp":
        this.updatePos(
          this.position.x,
          this.position.y - this.settings.stepSize
        );
        break;
      case "ArrowDown":
        this.updatePos(
          this.position.x,
          this.position.y + this.settings.stepSize
        );
        break;
      case "ArrowLeft":
        this.updatePos(
          this.position.x - this.settings.stepSize,
          this.position.y
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

  obstacleCollisionCheck() {
    this.map.obstacles.forEach((obstacle) => {
      if (
        this.middle.x + this.playerSize / 2 > obstacle.x[0] &&
        this.middle.x - this.playerSize / 2 < obstacle.x[1] &&
        this.middle.y + this.playerSize / 2 > obstacle.y[0] &&
        this.middle.y - this.playerSize / 2 < obstacle.y[1]
      ) {
        console.log("contact");
        if (this.middle.x < obstacle.x[0]) {
          console.log("left hit");
          this.position.x = obstacle.x[0] - this.playerSize;
          this.middle.x = obstacle.x[0] - this.playerSize / 2;
        }
        if (this.middle.x > obstacle.x[1]) {
          console.log("right hit");
          this.position.x = obstacle.x[1];
          this.middle.x = obstacle.x[1] + this.playerSize / 2;
        }
        if (this.middle.y < obstacle.y[0]) {
          console.log("top hit");
          this.position.y = obstacle.y[0] - this.playerSize;
          this.middle.y = obstacle.y[0] - this.playerSize / 2;
        }
        if (this.middle.y > obstacle.y[1]) {
          console.log("bottom hit");
          this.position.y = obstacle.y[1];
          this.middle.y = obstacle.y[1] + this.playerSize / 2;
        }
      }
      if (this.phasing(obstacle)) {
        this.updatePos(this.position.previous.x, this.position.previous.y);
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
    }
  }
}
