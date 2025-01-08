export class Obstacle {
  count = 0;
  constructor(x, y, map) {
    this.id = this.count;
    this.map = map;
    this.x = x;
    this.y = y;
    this.size = 50;
    super.count++;
  }
  init = () => {
    const obstacle = document.createElement("div");
    obstacle.id = this.id;
    obstacle.classList.add("obstacle");
    obstacle.style.width = `${this.size}px`;
    obstacle.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.map.object.appendChild(obstacle);
  };
}
