const map = document.getElementById("map");
const player = document.getElementById("player");

// Move object to clicked coordinates on screen
map.addEventListener("click", (e) => {
  console.log(e.clientX, e.clientY);
  //   player.style.scale = 0.5
  player.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
