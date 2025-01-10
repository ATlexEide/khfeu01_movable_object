import { map } from "./main.js";
export class Obstacle {
  static count = 0;
  static usedSpace = [];
  constructor(x, y, size = 50) {
    this.id = Obstacle.count;
    Obstacle.count++;
    this.map = map;
    this.x = x;
    this.maxX = x + size;
    this.y = y;
    this.maxY = y + size;
    this.size = size;
    this.place();
  }
  place = () => {
    console.log("X: ", this.x, this.maxX);
    console.log("Y : ", this.y, this.maxY);
    Obstacle.usedSpace.push({ x: [this.x, this.maxX], y: [this.y, this.maxY] });
    console.log(Obstacle.usedSpace);
    const obstacle = document.createElement("div");
    obstacle.id = this.id;
    obstacle.classList.add("obstacle");
    obstacle.style.width = `${this.size}px`;
    obstacle.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.map.object.appendChild(obstacle);
    console.log(this);
  };
}
