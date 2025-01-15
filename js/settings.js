import { Obstacle } from "./obstacle.js";
import { Player } from "./player.js";
export class Settings {
  // Buttons
  settingsBtn = document.getElementById("settings");
  applySettingsBtn = document.getElementById("apply-btn");
  cancelSettingsBtn = document.getElementById("cancel-btn");
  // Inputs
  playerSizeInput = document.getElementById("player-size");
  stepSizeInput = document.getElementById("step-size");
  // Dialog
  settingsDialog = document.getElementById("settings-dialog");
  addObstacleBtn = document.getElementById("add-obstacle-btn");
  obstacleSizeInput = document.getElementById("add-obstacle-size");
  userNameInput = document.getElementById("change-skin");
  // Params/Variables
  defaultUserName = "steve";
  previewActive = false;
  deletingObstacle = false;
  constructor(playerSize = 100, stepSize = 50) {
    this.stepSize = stepSize;
    this.playerSize = playerSize;
  }
  init = (map, player) => {
    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyP":
          this.settingsDialog.showModal();
          break;
        case "KeyO":
          if (this.previewActive) return;
          this.previewActive = true;
          this.previewObstacle(map);
          break;
        case "Delete":
          this.deletingObstacle = true;
          this.deleteObstacle(map);
          break;
        default:
          break;
      }
    });
    // Open settings dialog
    this.settingsBtn.addEventListener("click", () => {
      this.settingsDialog.showModal();
    });

    // Cancel settings and close dialog
    this.cancelSettingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.settingsDialog.close();
    });
    // Apply settings
    this.applySettingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const userName = this.userNameInput.value
        ? this.userNameInput.value
        : this.defaultUserName;
      player.object.style.backgroundImage = `url(https://minotar.net/avatar/${userName})`;
      this.changePlayerSize(player, this.playerSizeInput.value);
      this.changeStepSize(player, this.stepSizeInput.value);
      map.updateBorder(this);
      this.settingsDialog.close();
    });
    this.addObstacleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.obstacleSizeInput.value && this.obstacleSizeInput.value < 50) {
        alert("Size must be 50 or more");
        return;
      }
      this.previewActive = true;
      this.previewObstacle(
        map,
        this.obstacleSizeInput.value ? this.obstacleSizeInput.value : 50
      );
      this.settingsDialog.close();
    });
    player.resetPos();
  };
  changePlayerSize(player, size) {
    this.playerSize = Number(size);
    player.playerSize = Number(size);
    player.object.style.width = `${player.playerSize}px`;
  }
  changeStepSize(player, size) {
    player.stepSize = Number(size);
    this.stepSize = Number(size);
  }
  previewObstacle(map, size = 50) {
    let x = this.mouseX - size / 2;
    let y = this.mouseY - size / 2;
    const preview = document.createElement("div");
    preview.id = "obstacle-preview";
    preview.style.width = `${size}px`;
    preview.style.transform = `translate(${x}px, ${y}px)`;
    map.object.appendChild(preview);
    const guide = document.createElement("pre");
    guide.id = "guide";
    guide.textContent = "Use scrollwheel to change size\nClick to place";
    map.object.appendChild(guide);
    guide.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;
    map.object.addEventListener("mousemove", (e) => {
      if (this.previewActive) {
        x = e.clientX - size / 2;
        y = e.clientY - size / 2;
        preview.style.transform = `translate(${x}px, ${y}px)`;
        guide.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;
      }
    });
    map.object.addEventListener("wheel", resize);
    if (this.previewActive) {
      map.object.addEventListener(
        "mousedown",
        () => {
          map.object.removeChild(preview);
          map.object.removeChild(guide);
          this.addObstacle(x, y, size);
          this.previewActive = false;
          map.object.removeEventListener("wheel", resize);
        },
        { once: true }
      );
    }
    function resize(e) {
      console.log(e.wheelDelta);
      if (e.wheelDelta > 0) {
        size += 10;
        x = e.clientX - size / 2;
        y = e.clientY - size / 2;
        console.log("+");
        preview.style.width = `${size}px`;
        preview.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (e.wheelDelta < 0) {
        size -= 10;
        if (size < 50) size = 50;
        x = e.clientX - size / 2;
        y = e.clientY - size / 2;
        console.log("-");
        preview.style.width = `${size}px`;
        preview.style.transform = `translate(${x}px, ${y}px)`;
      }
    }
  }
  deleteObstacle(map) {
    let currTarget;
    const obstacles = document.getElementsByClassName("obstacle");
    for (const obstacle of obstacles) {
      obstacle.addEventListener("mouseover", (e) => {
        if (!this.deletingObstacle) return;
        obstacle.style.border = "solid 4px blue";
        currTarget = e.target;
        obstacle.addEventListener("mouseleave", () => {
          obstacle.style.border = 0;
        });
      });
    }
    map.object.addEventListener(
      "click",
      (e) => {
        this.deletingObstacle = false;
        if (e.target === currTarget) map.object.removeChild(currTarget);
        for (const obstacle of obstacles) {
          obstacle.removeEventListener("mouseover", () => {});
          obstacle.removeEventListener("mouseleave", () => {});
        }
      },
      { once: true }
    );
  }
  addObstacle(x, y, size) {
    new Obstacle(x, y, Number(size));
  }
}
// function makeTarget(e, obstacle) {
//   obstacle.style.border = "solid 4px blue";
//   currTarget = e.target;
// }
// function removeTarget() {
//   obstacle.style.border = 0;
// }
