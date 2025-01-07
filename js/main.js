const map = document.getElementById("map");
const player = document.getElementById("player");
// Positioning variables
let posX = 0;
let posY = 0;
let step = 50;
// Move object to clicked coordinates on screen
map.addEventListener("click", (e) => {
  console.log(e.clientX, e.clientY);
  posX = e.clientX;
  posY = e.clientY;
  player.style.transform = `translate(${posX}px, ${posY}px)`;
});
//
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      posY -= step;
      console.log(posY);
      player.style.transform = `translate(${posX}px, ${posY}px)`;
      break;
    case "ArrowDown":
      posY += step;
      console.log(posY);
      player.style.transform = `translate(${posX}px, ${posY}px)`;

      break;
    case "ArrowLeft":
      posX -= step;
      console.log(posX);
      player.style.transform = `translate(${posX}px, ${posY}px)`;
      break;
    case "ArrowRight":
      posX += step;
      console.log(posX);
      player.style.transform = `translate(${posX}px, ${posY}px)`;
      break;

    default:
      break;
  }
});
