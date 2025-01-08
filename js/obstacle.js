import { map } from "./main.js";
export class Obstacle {
  static count = 0;
  constructor(x, y, size = 50) {
    this.id = Obstacle.count;
    Obstacle.count++;
    this.map = map;
    this.x = x;
    this.y = y;
    this.size = size;
  }
  place = () => {
    const obstacle = document.createElement("div");
    obstacle.id = this.id;
    obstacle.classList.add("obstacle");
    obstacle.style.width = `${this.size}px`;
    obstacle.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.map.object.appendChild(obstacle);
    console.log(this);
  };
}
